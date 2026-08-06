import AuthForm from "./AuthForm";

const Login = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-3 bg-main-bg">
      <AuthForm type={"login"} />
    </main>
  );
};

export default Login;
