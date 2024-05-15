// 액션 타입
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// 액션 함수
export const login = (loginInfo) => ({
  type: 'LOGIN',
  loginInfo
});

export const logout = () => ({
  type: 'LOGOUT'
});

const initialState = {
  status: false
};

// 리듀서
// eslint-disable-next-line default-param-last
const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loginInfo: action.loginInfo, status: true };
    case 'LOGOUT':
      return { ...state, loginInfo: action.loginInfo, status: undefined };
    default:
      return state;
  }
};

export default userLogin;
