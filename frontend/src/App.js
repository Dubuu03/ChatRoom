import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/logInPage';
import Register from './pages/registerPage';
import ChatRoom from './pages/chatRoomPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
