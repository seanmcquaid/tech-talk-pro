'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

const NotFound: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/404');
  }, [router]);

  return <></>;
};

export default NotFound;
