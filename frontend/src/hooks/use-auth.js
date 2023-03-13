import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

export function useAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const localUser = {
    id: localStorage.getItem('userId'),
    login: localStorage.getItem('login'),
    password: localStorage.getItem('password')
  };

  if (localUser.id) {
    dispatch(setUser(localUser));
  }

  return {
    isAuth: !!user.id,
    ...user,
  };
}
