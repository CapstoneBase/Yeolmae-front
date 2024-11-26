import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DELETE_TOKEN } from '../../redux/modules/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch(DELETE_TOKEN());
    navigate('/');
  }, [dispatch, navigate]);

  return { logout };
};
