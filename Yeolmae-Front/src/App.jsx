import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Suspense, lazy, memo } from 'react';
import { useSelector } from 'react-redux';
import GlobalStyle from './style/globalStyles';
import theme from './style/theme';
import Header from './components/Common/Header';

const Notfound = lazy(() => import('./components/pages/NotFound/NotFound'));
const Main = lazy(() => import('./components/pages/MainPage/MainPage'));
const Signup = lazy(() => import('./components/pages/SignupPage/SignupPage'));
const Login = lazy(() => import('./components/pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage/ProfilePage'));
const EditProfilePage = lazy(() => import('./components/pages/ProfilePage/EditProfilePage'));

const PortfolioPage = lazy(() => import('./components/pages/Portfolio/PortfolioPage'));
const EditPortfolioPage = lazy(() => import('./components/pages/Portfolio/EditPortfolioPage'));

const PostList = lazy(() => import('./components/pages/PostListPage/PostListPage'));
const GradPostList = lazy(() => import('./components/pages/PostListPage/GradPostListPage'));
const OtherPostList = lazy(() => import('./components/pages/PostListPage/OtherPostListPage'));
const ContPostList = lazy(() => import('./components/pages/PostListPage/ContPostListPage'));

const CommentList = lazy(() => import('./components/pages/Comment/CommentList'));
const CreatePost = lazy(() => import('./components/pages/post/CreatePost'));
const ViewPost = lazy(() => import('./components/pages/post/ViewPost'));
const EditPost = lazy(() => import('./components/pages/post/EditPost'));

const App = memo(() => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <>
      <Header />
      {/* <GlobalStyle />
      <ThemeProvider theme={theme}> */}
      <div className="container-xl bd-gutter bd-layout">
        <main>
          <Suspense>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/edit" element={<EditPortfolioPage />} />

              <Route path="/postlist" element={<PostList />} />
              <Route path="/postlist/grad" element={<GradPostList />} />
              <Route path="/postlist/cont" element={<ContPostList />} />
              <Route path="/postlist/other" element={<OtherPostList />} />

              {/* <Route path="/posts/:type" element={<PostList />} /> */}

              {/* <Route
                path="/posts/:type/create"
                element={authenticated ? <CreatePost /> : <Navigate to="/loginPage" />}
              /> */}
              <Route path="/posts/:type/:id" element={<ViewPost />} />
              <Route path="/posts/:type/:id/comments" element={<CommentList />} />
              <Route path="/posts/:type/create" element={<CreatePost />} />
              <Route path="/posts/:type/edit" element={<EditPost />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      {/* </ThemeProvider> */}
    </>
  );
});

export default App;
