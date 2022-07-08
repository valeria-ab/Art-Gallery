import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { AppDispatch, IAppStore } from '../store/store';
// eslint-disable-next-line import/no-cycle
import { refreshTC } from '../store/auth-reducer';
// eslint-disable-next-line import/no-cycle

export const BASE_URL = 'https://internship-front.framework.team/';

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  // headers: {
  // 'Accept': 'application/json',
  //  'Content-Type': 'application/json',
  // },
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const useAxiosPrivate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>((state) => state.auth.isInitialized);
  const accessToken = useSelector<IAppStore, string>((state) => state.auth.accessToken);
  useEffect(() => {
    const requestIntercept = privateInstance.interceptors.request.use(

      (config) => {
        // @ts-ignore
        if (!config.headers.Authorization) {
          // @ts-ignore
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error),
    );

    const responseIntercept = privateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await dispatch(refreshTC());
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateInstance(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      privateInstance.interceptors.request.eject(requestIntercept);
      privateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [isInitialized, accessToken]);
  return privateInstance;
};
