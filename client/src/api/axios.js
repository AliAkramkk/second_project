// axiosConfig.js
import axios from 'axios';
import { auth } from '../context/authReducer';
import { useSelector } from 'react-redux';

const BASE_URL = 'http://localhost:3000';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

axiosPrivate.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosPrivate.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("Interceptor - Success:", response);
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log("Interceptor - Error:", error);
  if (error.response) {
    console.log("Response object:", error.response);
    console.log("Status code:", error.response.status);
  }
  if (error.response && error.response.status === 403) {
    //     // Handle blocked user, for example, redirect to a blocked page
    window.location.href = "/signin";
    return Promise.reject(response);
  }
});