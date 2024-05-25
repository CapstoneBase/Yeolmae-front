import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Suspense, lazy, memo } from 'react';
import theme from './style/theme';
import Header from './components/Common/Header';

const Main = lazy(() => import('./components/pages/MainPage/MainPage'));
const Signup = lazy(() => import('./components/pages/MainPage/MainPage'));
const Login = lazy(() => import('./components/pages/MainPage/MainPage'));
const Notfound = lazy(() => import('./components/pages/MainPage/MainPage'));

const App = memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>
        <Link to="/">메인 홈</Link>
        <Link to="/signupPage">회원가입페이지</Link>
        <Link to="/loginPage">로그인페이지</Link>
      </div>
      <Suspense fallback={<div>Now Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signupPage" element={<Signup />} />
          <Route path="/loginPage" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
});

export default App;
