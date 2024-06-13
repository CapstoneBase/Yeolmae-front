import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '../../Common/Button';
import PostCard from '../../Common/PostCard';
import PageGrid from '../../Common/PageGrid';
import Categories from '../../Common/DropdownItem';
import category from '../../Common/category.json';
import AuthButton from './AuthButton';
// import CategoryDropdown from '../../Common/DropdownItem';
// import Categories, { SubCategory } from '../../Common/DropdownItem';

function PostList() {
  return (
    <>
      {/* <CategoryDropdown /> */}
      <Categories data={category} />
      {/* <SubCategory data={category} /> */}
      <PageGrid />
      <AuthButton />
    </>
  );
}

export default PostList;
