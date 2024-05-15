import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './components/MainPage/MainPage';
import Signup from './components/SignupPage/SignupPage';
import Login from './components/LoginPage/LoginPage';
import Notfound from './components/NotFound/NotFound';
import Header from './components/Common/Header';

function App() {
  return (
    <>
      <Header />
      <div>
        {/* 페이지 경로 표시 */}
        <Link to="/">메인 홈</Link>
        <Link to="/signupPage">회원가입페이지</Link>
        <Link to="/loginPage">로그인페이지</Link>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signupPage" element={<Signup />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
