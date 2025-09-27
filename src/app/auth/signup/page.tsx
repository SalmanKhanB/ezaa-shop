import AuthForm from "@/components/forms/auth-form";
import SignupForm from "@/components/forms/signup-form";
import Loader from "@/components/loader";
import { Suspense } from "react";

const Signup = () => {
  return (
    <AuthForm type="signup">
      <Suspense fallback={<Loader />}>
      <SignupForm />
      </Suspense>

          </AuthForm>
  );
};

export default Signup;
