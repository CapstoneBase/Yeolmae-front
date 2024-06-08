import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Main from './components/pages/MainPage/MainPage';
import Signup from './components/pages/SignupPage/SignupPage';
import Login from './components/pages/LoginPage/LoginPage';
import Notfound from './components/pages/NotFound/NotFound';
import Header from './components/Common/Header';
import PostList from './components/pages/PostListPage/PostListPage';

const Routers = styled.div`
  // display: none;
`;

function App() {
  return (
    <>
      <Header />
      <Routers>
        {/* 페이지 경로 표시 */}
        <Link to="/">메인 홈</Link>
        <Link to="/signupPage">회원가입페이지</Link>
        <Link to="/loginPage">로그인페이지</Link>
        {/* <Link to="/postlistPage">게시글 목록</Link> */}
      </Routers>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signupPage" element={<Signup />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/postlistPage" element={<PostList />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
