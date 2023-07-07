'use client';
import { useGetTalksQuery } from '@/store/talksApi';

const PlaceholderPage = () => {
  const { data } = useGetTalksQuery();
  console.log(data);
  return <div>{'Placeholder'}</div>;
};

export default PlaceholderPage;
