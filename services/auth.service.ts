import api from '@/lib/api';

export const loginRequest = async (email: string, password: string) => {
  const res = await api.post('/login', { email, password });
  return res.data; // يجب أن يرجع: { token: string, user: { ... } }
};

export const getMe = async () => {
  const res = await api.get('/me');
  return res.data; // تأكد أن API يرجع user object
};

export const logoutRequest = async () => {
  const res = await api.post('/logout');
  return res.data;
};

export const registerRequest = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  const res = await api.post('/register', {
    name,
    email,
    password,
    password_confirmation,
  });

  return res.data;
};
