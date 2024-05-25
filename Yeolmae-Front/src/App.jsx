import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import Main from './components/pages/MainPage/MainPage';
import Signup from './components/pages/SignupPage/SignupPage';
import Login from './components/pages/LoginPage/LoginPage';
import Notfound from './components/pages/NotFound/NotFound';
import Header from './components/Common/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
