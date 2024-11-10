import { useNavigate } from 'react-router-dom';
// 선택한 카테고리로 이동
function useCategoryUpdate({ children }) {
  const navigate = useNavigate();

  sessionStorage.setItem(
    'category',
    JSON.stringify({
      cateId: `${children.cateId}`,
      cateName: `${children.cateName}`,
      parntCateId: `${children.parntCateId}`
    })
  );

  navigate('/postListPage', {
    state: {
      cateId: `${children.cateId}`,
      cateName: `${children.cateName}`,
      parntCateId: `${children.parntCateId}`
    }
  });
  console.log('children: ', children);
}

export default useCategoryUpdate;
