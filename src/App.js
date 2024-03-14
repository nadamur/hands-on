import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Lessons from './pages/Lessons';
import Translator from './pages/Translator';
import Lesson1 from './pages/Lessons/Lesson1/MainPage';
import Lesson2 from './pages/Lessons/Lesson2/MainPage';
import Lesson from './pages/Lessons/Lesson';

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path = "/" exact element={<Home />} />
          <Route path = "/lesson/:lessonID" exact element={<Lesson />} />
          <Route path = "/lessons" exact element={<Lessons />} />
          <Route path = "/translator" exact element={<Translator />} />
          <Route path = "/lesson1" exact element={<Lesson1 />} />
          <Route path = "/lesson2" exact element={<Lesson2 />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
