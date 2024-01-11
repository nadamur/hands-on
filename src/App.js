import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Learn from './pages/Learn';

function App() {
  return (
    <div className = "App">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" exact element={<Home />} />
          <Route path = "/learn" exact element={<Learn />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
