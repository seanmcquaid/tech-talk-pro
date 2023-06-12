'use client';
import { useAppDispatch } from '@/store';
import { selectIsInitialized } from '@/store/app/selectors';
import { setInitialized } from '@/store/app/slice';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';

// This might be a good place to to pass in props from a server component with data from the server to initialize our client with.

const InitializeApp: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setInitialized());
    }
  }, [dispatch, isInitialized]);

  return <>{children}</>;
};

export default InitializeApp;
