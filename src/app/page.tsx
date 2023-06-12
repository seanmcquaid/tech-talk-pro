import Counter from '@/components/Counter';
import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <Counter />
    </div>
  );
};

export default Home;
