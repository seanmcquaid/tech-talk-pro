import PageWrapper from '@/components/PageWrapper';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <PageWrapper isCentered>
      <SignIn />
    </PageWrapper>
  );
}
