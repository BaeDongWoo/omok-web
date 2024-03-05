import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import NicknameInput from './pages/StartPage';
import WaitingPage from './pages/WaitingPage';
import Background from './components/common/background/Background';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<NicknameInput />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/room/:roomId/:roomTitle" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
