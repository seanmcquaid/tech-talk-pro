'use client'; // Error components must be Client Components

import ErrorPage from '@/components/ErrorPage';
import { FC } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: FC<ErrorProps> = props => <ErrorPage {...props} />;

export default Error;
