import api from './api';

// 토큰 저장
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem('token');
};

// 토큰 삭제
export const removeToken = () => {
  localStorage.removeItem('token');
};

// 토큰이 있는지 확인
export const isAuthenticated = () => {
  return !!getToken();
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/admin/login', { username, password });
    const data = response.data;
    if (data.result_code === 201 && data.login_token) {
      setToken(data.login_token);
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/admin/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeToken();
  }
}; 