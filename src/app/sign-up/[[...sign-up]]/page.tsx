import PageWrapper from '@/components/PageWrapper';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <PageWrapper isCentered>
      <SignUp />
    </PageWrapper>
  );
}
