import postsService from '@/services/postsService';
import { UserButton } from '@clerk/nextjs';

export default async function Home() {
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
}
