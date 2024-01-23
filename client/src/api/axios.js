// axiosConfig.js
import axios from 'axios';
import { auth } from '../context/authReducer';
import { useSelector } from 'react-redux';

const BASE_URL = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(async function (config) {
  // Do something before request is sent
  try {
    const user = useSelector(auth);

    // If user is available, include it in the headers
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    const response = await axiosPrivate.get('/checkAccess');
    console.log(response.data);
  } catch (error) {
    console.error("Error checking access:", error);
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosPrivate.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  const { data } = response;

  // Check if the response contains an access control message
  if (data && data.message === "You are blocked") {
    // Handle blocked user, for example, redirect to a blocked page
    window.location.href = "/signin";
    return Promise.reject(response);
  }

  return response;
}, function (error) {
  // Any status codes that fall outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
