import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '../Common/Button';
import PostCard from '../Common/PostCard';
import PageGrid from '../Common/PageGrid';
import CategoryDropdown from '../Common/CategoryDropdown';

function PostList() {
  return (
    <>
      <CategoryDropdown />
      <PageGrid />
    </>
  );
}

export default PostList;
