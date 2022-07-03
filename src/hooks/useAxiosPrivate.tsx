import React from 'react';
import { useSelector } from 'react-redux';
import { IAppStore } from '../store/store';

export const useAxiosPrivate = () => {
  const isInitialized = useSelector<IAppStore, boolean>((state) => state.auth.isInitialized);
  return <div />;
};
