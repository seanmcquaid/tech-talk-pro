'use client'; // Error components must be Client Components

import { FC, useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{'Something went wrong!'}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {'Try again'}
      </button>
    </div>
  );
};

export default Error;
