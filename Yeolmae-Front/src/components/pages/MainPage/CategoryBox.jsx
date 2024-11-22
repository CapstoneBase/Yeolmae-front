import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../../Common/Categories';

const ParCatBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const ParentCatBtn = styled.button`
  height: 90px;
  width: 100px;
  border: none;
  outline: none;
  color: black;
  font-size: 15px;
  background-color: inherit;
  padding: 14px 16px;
  margin: 0;

  &:hover {
    background-color: #ddd;
  }

  &:hover + div {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 300px));
    justify-content: center;
  }
`;

const CatBox = styled.div`
  display: none;
  position: absolute;
  top: 500px;
  left: 0;
  width: 100%;
  background-color: #f9f9f9;
  z-index: 1;

  &:hover {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 300px));
    justify-content: center;
  }
`;

const CatBtn = styled.div`
  display: block;
  padding: 8px 30px;
  // background-color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

function CategoryBox() {
  const navigate = useNavigate();

  // 선택한 카테고리로 이동
  const onClickCategory = ({ children }) => {
    navigate('/postListPage', {
      state: {
        cateId: `${children.cateId}`,
        cateName: `${children.cateName}`,
        parntCateId: `${children.parntCateId}`
      }
    });
    console.log('children: ', children);
  };

  return (
    <ParCatBox>
      {Categories.map((parent) =>
        parent.parntCateId === '00' ? (
          <div>
            <ParentCatBtn key={`parentCategory${parent.cateId}`} value={parent.cateId}>
              {parent.cateName}
            </ParentCatBtn>
            <CatBox>
              {Categories.map((children) =>
                children.parntCateId === parent.cateId ? (
                  <CatBtn
                    className="category-button"
                    key={`category${children.cateId}`}
                    value={children.cateId}
                    onClick={() => onClickCategory({ children })}
                  >
                    {children.cateName}
                  </CatBtn>
                ) : null
              )}
            </CatBox>
          </div>
        ) : null
      )}
    </ParCatBox>
  );
}

export default CategoryBox;
