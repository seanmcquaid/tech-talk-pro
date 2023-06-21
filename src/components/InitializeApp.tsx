'use client';
import { useAppDispatch } from '@/store';
import { selectIsInitialized } from '@/store/app/selectors';
import { setInitialized } from '@/store/app/slice';
import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

// This might be a good place to to pass in props from a server component with data from the server to initialize our client with.

const InitializeApp = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setInitialized());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return children;
};

export default InitializeApp;
