import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
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
