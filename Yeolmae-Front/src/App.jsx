import { BrowserRouter as Routers, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Main from './components/pages/MainPage/MainPage';
import Signup from './components/pages/SignupPage/SignupPage';
import Login from './components/pages/LoginPage/LoginPage';
import Notfound from './components/pages/NotFound/NotFound';
import Header from './components/Common/Header';
import PostList from './components/PostListPage/PostListPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signupPage" element={<Signup />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/postlistPage" element={<PostList />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
