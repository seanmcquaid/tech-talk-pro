import PageWrapper from '@/components/PageWrapper';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <PageWrapper isCentered>
      <SignUp />
    </PageWrapper>
  );
};

export default SignUpPage;
