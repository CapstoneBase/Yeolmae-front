import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
/*
{
  "results": [
      {
        "parentCategoryID": 1,
        "parentcategoryName": "인문학",
        "categories": [
          {"categoryID": 1, "categoryName": "인문학일반"},
          {"categoryID": 2, "categoryName": "역사학"},
          {"categoryID": 3, "categoryName": "철학"},
          {"categoryID": 4, "categoryName": "종교학/신학"},
          {"categoryID": 5, "categoryName": "언어학"},
          {"categoryID": 6, "categoryName": "문학"}
        ]
      },
      {
        "parentCategoryID": 2,
        "parentcategoryName": "사회과학",
        "categories": [
          {"categoryID": 1, "categoryName": "사회과학일반"},
          {"categoryID": 2, "categoryName": "정치외교학"},
          {"categoryID": 3, "categoryName": "경제학"},
          {"categoryID": 4, "categoryName": "경영학"},
          {"categoryID": 5, "categoryName": "무역학"},
          {"categoryID": 6, "categoryName": "사회학"}
        ]
      }
  ]
} */

// import axios from '../hooks/useAxios';

/* const Categories = ({ onSelect, category }) => {
  return (
     {categories.map((c) => (
      <Category key={c.name} active={category === c.name} onClick={() => onSelect(c.name)}>
        {c.text}
    </Category>
     ))}
  );
}; */

function GetCategory() {
  const [category, setCategory] = useState({});

  useEffect(() => {
    axios.get('/categories').then((response) => {
      setCategory(response.data);
    });
  }, []);

  const Categories = Object.values(category).map((item) => (
    <option key={item.id} value={item.id}>
      {item.displayName}
    </option>
  ));

  return Categories;
}
