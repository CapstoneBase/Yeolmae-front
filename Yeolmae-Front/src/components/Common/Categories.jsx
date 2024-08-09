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

/* function GetCategory() {
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
} */

const Categories = [
  { cateId: '0001', cateName: '인문학', parntCateId: '00' },
  { cateId: '0002', cateName: '사회과학', parntCateId: '00' },
  { cateId: '0003', cateName: '자연과학', parntCateId: '00' },
  { cateId: '0004', cateName: '공학', parntCateId: '00' },
  { cateId: '0005', cateName: '예술체육학', parntCateId: '00' },
  { cateId: '0006', cateName: '기타', parntCateId: '00' },
  { cateId: '000101', cateName: '인문학일반', parntCateId: '0001' },
  { cateId: '000102', cateName: '역사학', parntCateId: '0001' },
  { cateId: '000103', cateName: '철학', parntCateId: '0001' },
  { cateId: '000104', cateName: '종교학/신학', parntCateId: '0001' },
  { cateId: '000105', cateName: '언어학', parntCateId: '0001' },
  { cateId: '000106', cateName: '문학', parntCateId: '0001' },
  { cateId: '000107', cateName: '한국어문학', parntCateId: '0001' },
  { cateId: '000108', cateName: '중국어문학', parntCateId: '0001' },
  { cateId: '000109', cateName: '일본어문학', parntCateId: '0001' },
  { cateId: '000110', cateName: '영어문학', parntCateId: '0001' },
  { cateId: '000111', cateName: '프랑스어문학', parntCateId: '0001' },
  { cateId: '000112', cateName: '독일어문학', parntCateId: '0001' },
  { cateId: '000113', cateName: '러시아어문학', parntCateId: '0001' },
  { cateId: '000201', cateName: '사회과학일반', parntCateId: '0002' },
  { cateId: '000202', cateName: '정치외교학', parntCateId: '0002' },
  { cateId: '000203', cateName: '경제학', parntCateId: '0002' },
  { cateId: '000204', cateName: '경영학', parntCateId: '0002' },
  { cateId: '000205', cateName: '무역학', parntCateId: '0002' },
  { cateId: '000206', cateName: '사회학', parntCateId: '0002' },
  { cateId: '000207', cateName: '사회복지학', parntCateId: '0002' },
  { cateId: '000208', cateName: '지역학', parntCateId: '0002' },
  { cateId: '000209', cateName: '교육학', parntCateId: '0002' },
  { cateId: '000210', cateName: '법학', parntCateId: '0002' },
  { cateId: '000211', cateName: '행정학', parntCateId: '0002' },
  { cateId: '000212', cateName: '지리/지역개발학', parntCateId: '0002' },
  { cateId: '000213', cateName: '관광학', parntCateId: '0002' },
  { cateId: '000214', cateName: '신문방송학', parntCateId: '0002' },
  { cateId: '000215', cateName: '군사학', parntCateId: '0002' },
  { cateId: '000216', cateName: '심리과학', parntCateId: '0002' },
  { cateId: '000217', cateName: '문헌정보학', parntCateId: '0002' },
  { cateId: '000301', cateName: '자연과학일반', parntCateId: '0003' },
  { cateId: '000302', cateName: '수학/통계학', parntCateId: '0003' },
  { cateId: '000303', cateName: '물리학', parntCateId: '0003' },
  { cateId: '000304', cateName: '생물학', parntCateId: '0003' },
  { cateId: '000305', cateName: '천문/지구과학', parntCateId: '0003' },
  { cateId: '000306', cateName: '생활과학', parntCateId: '0003' },
  { cateId: '000401', cateName: '공학일반', parntCateId: '0004' },
  { cateId: '000402', cateName: '기계공학', parntCateId: '0004' },
  { cateId: '000403', cateName: '항공우주공학', parntCateId: '0004' },
  { cateId: '000404', cateName: '컴퓨터학', parntCateId: '0004' },
  { cateId: '000405', cateName: '화학/생물공학', parntCateId: '0004' },
  { cateId: '000406', cateName: '전기/제어계측공학', parntCateId: '0004' },
  { cateId: '000407', cateName: '토목/환경공학', parntCateId: '0004' },
  { cateId: '000408', cateName: '전자/정보통신공학', parntCateId: '0004' },
  { cateId: '000409', cateName: '건축공학', parntCateId: '0004' },
  { cateId: '000410', cateName: '산업공학', parntCateId: '0004' },
  { cateId: '000411', cateName: '조선/해양공학', parntCateId: '0004' },
  { cateId: '000412', cateName: '자원/재료공학', parntCateId: '0004' },
  { cateId: '000501', cateName: '예술체육학일반', parntCateId: '0005' },
  { cateId: '000502', cateName: '음악', parntCateId: '0005' },
  { cateId: '000503', cateName: '미술', parntCateId: '0005' },
  { cateId: '000504', cateName: '디자인', parntCateId: '0005' },
  { cateId: '000505', cateName: '의상', parntCateId: '0005' },
  { cateId: '000506', cateName: '사진', parntCateId: '0005' },
  { cateId: '000507', cateName: '미용', parntCateId: '0005' },
  { cateId: '000508', cateName: '연극', parntCateId: '0005' },
  { cateId: '000509', cateName: '영화', parntCateId: '0005' },
  { cateId: '000510', cateName: '체육', parntCateId: '0005' },
  { cateId: '000511', cateName: '무용', parntCateId: '0005' },
  { cateId: '000601', cateName: '의약학', parntCateId: '0006' },
  { cateId: '000602', cateName: '농수해양학', parntCateId: '0006' },
  { cateId: '000603', cateName: '교육', parntCateId: '0006' },
  { cateId: '000604', cateName: '과학기술학/기술정책', parntCateId: '0006' },
  { cateId: '000605', cateName: '여성학', parntCateId: '0006' },
  { cateId: '000606', cateName: '뇌/인지과학', parntCateId: '0006' },
  { cateId: '000607', cateName: '학제간연구', parntCateId: '0006' }
];

export default Categories;
