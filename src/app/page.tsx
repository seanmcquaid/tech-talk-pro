import postsService from '@/services/postsService';
import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';

const Home: FC = async () => {
  const posts = await postsService.getPosts();
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
