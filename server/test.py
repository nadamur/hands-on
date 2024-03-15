import os
import atexit
import cv2
import numpy as np
from flask_cors import CORS
from flask import Flask, render_template, Response
import mediapipe as mp
from keras.models import Sequential
from keras.layers import LSTM, Dense

app = Flask(__name__)
CORS(app, resources={r"/video_feed": {"origins": "http://localhost:3000"}})

# 1. New detection variables
timer = 0
threshold = 0.95
cap = cv2.VideoCapture(0)

# MediaPipe Holistic model and drawing utilities
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Color conversion BGR to RGB
    image.flags.writeable = False                   # Image no longer writeable
    results = model.process(image)                  # Predict
    image.flags.writeable = True                    # Image no longer writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # Color conversion RGB to BGR
    return image, results

def draw_styled_landmarks(image, results):
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, mp_drawing.DrawingSpec(color=(245,135,135), thickness=2, circle_radius=2), mp_drawing.DrawingSpec(color=(255,73,73), thickness=2, circle_radius=2))  # Draw hand
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, mp_drawing.DrawingSpec(color=(90,106,249), thickness=2, circle_radius=2), mp_drawing.DrawingSpec(color=(38,60,255), thickness=2, circle_radius=2))  # Draw hand
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS, mp_drawing.DrawingSpec(color=(184,58,255), thickness=2, circle_radius=2), mp_drawing.DrawingSpec(color=(213,157,246), thickness=2, circle_radius=2))  # Draw pose connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION, mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1), mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1))  # Draw face connections


def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(132)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21 * 3)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(1404)
    return np.concatenate([pose, face, lh, rh])

colors = [(245,117,16), (117,245,16), (16,117,245), (0,0,0)]

def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for num, prob in enumerate(res):
        cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
        cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)        
    return output_frame

# List of actions
actions = np.array(['how is', 'your', 'day', 'neutral'])

# Videos will have this many frames
sequence_length = 30

model = Sequential()
model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30,1662)))
model.add(LSTM(128, return_sequences=True, activation='relu'))
model.add(LSTM(64, return_sequences=False, activation='relu'))
model.add(Dense(64, activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(actions.shape[0], activation='softmax'))

model.load_weights('action.h5')

def makePrediction():
    sequence = []
    sentence = []
    lastPre = ''
    with mp_holistic.Holistic(min_detection_confidence=0.7, min_tracking_confidence=0.7) as holistic:
        while cap.isOpened():

            # Read feed
            ret, frame = cap.read()

            # Make detections
            image, results = mediapipe_detection(frame, holistic)
            print(results)
            
            # Draw landmarks
            draw_styled_landmarks(image, results)
            
            # 2. Prediction logic
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            sequence = sequence[-30:]
            
            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                print(actions[np.argmax(res)])
            #3. Viz logic
                if res[np.argmax(res)] > threshold: 
                    if lastPre == actions[np.argmax(res)]:
                        timer += 1
                    else:
                        timer = 0
                        
                    lastPre = actions[np.argmax(res)]

                    if timer == 10:
                        timer = 0
                        if actions[np.argmax(res)] == 'neutral':
                            sentence.clear()
                            sentence.append(actions[np.argmax(res)])
                        else:
                            if len(sentence) > 0 and sentence[0] != 'neutral':
                                if actions[np.argmax(res)] != sentence[-1]:
                                    sentence.append(actions[np.argmax(res)])
                            else:
                                sentence.clear()
                                sentence.append(actions[np.argmax(res)])

                if len(sentence) > 5: 
                    sentence = sentence[-5:]

                # Viz probabilities
                image = prob_viz(res, actions, image, colors)

            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + cv2.imencode('.jpg', image)[1].tobytes() +
                b'\r\n\r\n')

@app.route('/')
def index():
    return render_template('index.js')

@app.route('/video_feed')
def video_feed():
    return Response(makePrediction(), mimetype='multipart/x-mixed-replace; boundary=frame')

def cleanup():
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    atexit.register(cleanup)
    app.run(debug=True)


