import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Suspense, lazy, memo } from 'react';
import { useSelector } from 'react-redux';
import GlobalStyle from './style/globalStyles';
import theme from './style/theme';
import Header from './components/Common/Header';

const Main = lazy(() => import('./components/pages/MainPage/MainPage'));
const Signup = lazy(() => import('./components/pages/SignupPage/SignupPage'));
const Login = lazy(() => import('./components/pages/LoginPage/LoginPage'));
const Notfound = lazy(() => import('./components/pages/NotFound/NotFound'));
const PostList = lazy(() => import('./components/pages/PostListPage/PostListPage'));
const ViewPost = lazy(() => import('./components/pages/ViewPost/ViewPost'));
// const UpdatePost = lazy(() => import('./components/pages/UpdatePost/UpdatePost'));
// <Link to="/posts/update/:id">게시글 수정</Link>
// <Route path="/posts/update/:id" element={<UpdatePost />} />
const CreatePost = lazy(() => import('./components/pages/CreatePost/CreatePost'));

const App = memo(() => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <>
      <Header />
      {/* <GlobalStyle />
      <ThemeProvider theme={theme}> */}
      <main>
        <Suspense>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signupPage" element={<Signup />} />
            <Route path="/loginPage" element={<Login />} />
            <Route path="/postlistPage" element={<PostList />} />
            <Route
              path="/posts/create"
              element={authenticated ? <CreatePost /> : <Navigate to="/loginPage" />}
            />
            <Route path="/posts/:id" element={<ViewPost />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
      </main>
      {/* </ThemeProvider> */}
    </>
  );
});

export default App;
