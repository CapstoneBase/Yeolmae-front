import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Suspense, lazy, memo } from 'react';
import GlobalStyle from './style/globalStyles';
import theme from './style/theme';
import Header from './components/Common/Header';

const Main = lazy(() => import('./components/pages/MainPage/MainPage'));
const Signup = lazy(() => import('./components/pages/SignupPage/SignupPage'));
const Login = lazy(() => import('./components/pages/LoginPage/LoginPage'));
const Notfound = lazy(() => import('./components/pages/NotFound/NotFound'));
const PostList = lazy(() => import('./components/pages/PostListPage/PostListPage'));
const Post = lazy(() => import('./components/pages/PostPage/PostPage'));
// const Post = lazy(() => import('./components/pages/PostPage/PostPage'));
// const CreatePost = lazy(() => import('./components/pages/CreatePost/CreatePost'));

const App = memo(() => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <div>
          <Link to="/">메인 홈</Link>
          <Link to="/signupPage">회원가입페이지</Link>
          <Link to="/loginPage">로그인페이지</Link>
          <Link to="/postlistPage">게시글 목록</Link>
          <Link to="/createPost">게시글 작성</Link>
          <Link to="./postPage">게시글 본문</Link>
        </div>
        <Suspense>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signupPage" element={<Signup />} />
            <Route path="/loginPage" element={<Login />} />
            <Route path="/postlistPage" element={<PostList />} />
            {/* <Route path="/createPost" element={<CreatePost />} /> */}
            <Route path="/postPage" element={<Post />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
});

export default App;
