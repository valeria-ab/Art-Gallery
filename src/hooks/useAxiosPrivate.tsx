import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IAppStore } from '../store/store';
import { privateInstance } from '../utils/api';
import { refreshTC } from '../store/auth-reducer';

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
        if (error?.response?.status === 403 && !prevRequest?.sent) {
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
