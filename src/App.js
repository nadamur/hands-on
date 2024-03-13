import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Lessons from './pages/Lessons';
import Translator from './pages/Translator';

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path = "/" exact element={<Home />} />
          <Route path = "/lessons" exact element={<Lessons />} />
          <Route path = "/translator" exact element={<Translator />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
