import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';

function AuthButton({ text, destination, curstate }) {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const des = destination;
  const state = curstate;
  const handleClick = () => {
    console.log(authenticated);
    if (authenticated) {
      console.log(state);
      navigate(des, state);
    } else {
      navigate('/loginPage');
    }
  };
  return <Button type="button" text={text} onClick={handleClick} />;
}

export default AuthButton;
