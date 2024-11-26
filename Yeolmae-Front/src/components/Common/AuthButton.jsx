import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';

function AuthButton() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const cateInit = { ...location.state };

  const handleClick = () => {
    console.log(authenticated);
    if (authenticated) {
      navigate('/posts/create', {
        state: {
          cateId: `${cateInit.cateId}`,
          cateName: `${cateInit.cateName}`,
          parntCateId: `${cateInit.parntCateId}`
        }
      });
    } else {
      navigate('/loginPage');
    }
  };
  return <Button type="button" text="글 작성하기" onClick={handleClick} />;
}

export default AuthButton;
