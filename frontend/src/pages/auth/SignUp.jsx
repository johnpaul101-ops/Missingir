import AuthForm from "./AuthForm.jsx";

const SignUp = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-3 bg-main-bg">
      <AuthForm type={"signup"} />
    </main>
  );
};

export default SignUp;
