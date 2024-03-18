import os
import atexit
import asyncio
import cv2
import numpy as np
from flask_cors import CORS
from flask import Flask, render_template, Response, stream_with_context, redirect
from flask_socketio import SocketIO, emit
import time
import mediapipe as mp
import tensorflow as tf

from keras.models import Sequential
from keras.layers import LSTM, Dense

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000", threading=True)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('connection_response', {'data': 'Connected successfully!'})

CORS(app, resources={r"/video_feed": {"origins": "http://localhost:3000"}},
     supports_credentials=True)  # Ensure credentials are supported for CORS
CORS(app, resources={r"/prediction": {"origins": "http://localhost:3000"}},
     supports_credentials=True)  # Ensure credentials are supported for CORS

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
    #mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION, mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1), mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1))  # Draw face connections

def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(132)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21 * 3)
    #face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(1404)
    return np.concatenate([pose, lh, rh])

colors = [(245,117,16), (117,245,16), (16,117,245), (0,0,0)]
def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for num, prob in enumerate(res):
        cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
        cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        
    return output_frame

# 1. New detection variables
timer = 0
word = ""
stillTimer = 0
moveTimer = 0
startPre = False
predictionMade = False
lastPreds = []
lastAppend = ''
sequence = []
sequence_movement = [False]
sentence = []
threshold = 0.95
cap = cv2.VideoCapture(0)

mp_holistic = mp.solutions.holistic  # Holistic model
mp_drawing = mp.solutions.drawing_utils  # Drawing utilities

def is_moving(start_keypoints, finish_keypoints):
    d = []
    for i in range(132, len(finish_keypoints)):
        d.append(abs(finish_keypoints[i] - start_keypoints[i]))
    if max(d) > 0.15: return True
    return False


def is_gesture(sequence_movement):
    true_count = 0
    false_count = 0

    for i in range(len(sequence_movement)):
        if sequence_movement[i]:
            true_count += 1
        else:
            false_count += 1

    if true_count/(len(sequence_movement)) > 0.2:
        return True

    return False

    #if all(value == False for value in sequence_movement[:5]) and all(
    #        value == False for value in sequence_movement[-5:]) and sum(sequence_movement) > 2:
    #    return False
    #return True

def predict(sequence):
    res = gesModel.predict(np.expand_dims(np.array(sequence), axis=0))
    return res

# List of actions
action_file = open("Vocab_final.txt", "r")
actions = np.array(action_file.read().split("\n"))
action_file.close()

alph = np.array(['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'])

# Videos will have this many frames
sequence_length = 30

gesModel = Sequential()
gesModel.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30,258)))
gesModel.add(LSTM(128, return_sequences=True, activation='relu'))
gesModel.add(LSTM(64, return_sequences=False, activation='relu'))
gesModel.add(Dense(64, activation='relu'))
gesModel.add(Dense(32, activation='relu'))
gesModel.add(Dense(actions.shape[0], activation='softmax'))

gesModel.load_weights('gestureModelFinal.h5')
aplhModel = model = tf.keras.models.load_model('letterModel.h5')

def makePrediction():
    global word, sequence_movement, sequence, startPre, timer, stillTimer, moveTimer, predictionMade, lastPreds, lastAppend, sentence
    global threshold, cap

    with mp_holistic.Holistic(min_detection_confidence=0.8, min_tracking_confidence=0.9) as holistic:
        while cap.isOpened():

            # Read feed
            ret, frame = cap.read()

            # Make detections
            image, results = mediapipe_detection(frame, holistic)

            # Draw landmarks
            draw_styled_landmarks(image, results)

            # 2. Prediction logic
            keypoints = extract_keypoints(results)
    #         sequence.insert(0,keypoints)
    #         sequence = sequence[:30]

            if len(sequence) > 3:
                sequence_movement.append(is_moving(keypoints, sequence[-4]))
                sequence_movement = sequence_movement[-8:]
            sequence.append(keypoints)
            sequence = sequence[-30:]

            if startPre and timer <= 25:
                timer += 1

            else:
                startPre = False

            # Letter detection
            if not is_gesture(sequence_movement) and timer == 0:
                stillTimer += 1
                moveTimer = 0

            else:
                stillTimer = 0
                moveTimer += 1

            print(is_gesture(sequence_movement))
            print(sequence_movement)
            if len(sequence) == 30:
                if moveTimer >= 10 and not startPre:
                    # npy_path = os.path.join("Test")
                    # np.save(npy_path, sequence)
                    startPre = True
                    timer = 0

                if timer == 20:
                    timer = 0
                    moveTimer = 0
                    startPre = False
                    res = predict(sequence)

                    sentence.append(actions[np.argmax(res)])
                    predictionMade = True

            if stillTimer > 15:
                res = model.predict(np.expand_dims(keypoints[132:], axis=0))

                if lastPreds.count(str(alph[np.argmax(res)])) == 5 and lastAppend != str(alph[np.argmax(res)]):
                    sentence.append(str(alph[np.argmax(res)]))
                    lastAppend = str(alph[np.argmax(res)])

                lastPreds.append(str(alph[np.argmax(res)]))
                lastPreds = lastPreds[-5:]

                predictionMade = True

            # Show on cam
            if predictionMade:
                if len(res[0]) == 24:
                    cv2.putText(image, alph[np.argmax(res)] + " " + str(res[0][np.argmax(res)]) + "   Timer: " + str(timer),
                                (3, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
                    word = alph[np.argmax(res)]
                else:
                    cv2.putText(image, actions[np.argmax(res)] + " " + str(res[0][np.argmax(res)]) + "   Timer: " + str(timer),
                                (3, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
                    word = actions[np.argmax(res)]
                socketio.emit('sentence', {'sentence': word})
                print(sentence[1:])

            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + cv2.imencode('.jpg', image)[1].tobytes() +
                b'\r\n\r\n')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(makePrediction(), mimetype='multipart/x-mixed-replace; boundary=frame')

def cleanup():
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    atexit.register(cleanup)
    socketio.run(app, debug=True)