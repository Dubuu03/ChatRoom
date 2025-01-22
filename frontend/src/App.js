import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/logInPage';
import Register from './pages/registerPage';
import ChatRoom from './pages/chatRoomPage';
import Dashboard from './pages/dashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
