import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import socket, { connectSocket } from "../../lib/socket.js";

const AuthForm = ({ type }) => {
  const { login, signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const isLogin = type == "login";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.email.trim() || !formData.password.trim()) return;
    } else {
      if (
        !formData.userName.trim() ||
        !formData.email.trim() ||
        !formData.password.trim()
      )
        return;
    }

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    if (!isLogin) {
      const data = signup(payload);

      if (socket.disconnect) {
        connectSocket();
      }

      toast.promise(data, {
        pending: "Loading...",
        success: {
          render({ data }) {
            return data?.message || "Successfully Created Account";
          },
        },
        error: {
          render({ data }) {
            return data?.message || "Failed To Create Account";
          },
        },
      });

      return;
    }

    const data = login(payload);

    toast.promise(data, {
      pending: "Loading...",
      success: {
        render({ data }) {
          return data.message || "Successfully Login";
        },
      },
      error: {
        render({ data }) {
          return data.message || "Failed To Login";
        },
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col gap-4 max-w-96 w-full bg-surface-bg h-auto p-5 border-border-color border rounded-md"
    >
      <h1 className="text-2xl text-header-text-color font-text-font text-center">
        {isLogin ? "Sign In" : "Sign Up"}
      </h1>

      <div className="flex flex-col gap-3">
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label htmlFor="userName" className="text-gray-400 text-sm">
              Username
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleInputChange}
              className="bg-active-link-bg px-2 py-3 rounded-md text-body-text-color placeholder:text-body-text-color focus:outline-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-400 text-sm">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-active-link-bg px-2 py-3 rounded-md text-body-text-color placeholder:text-body-text-color focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-400 text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-active-link-bg px-2 py-3 rounded-md text-body-text-color placeholder:text-body-text-color focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-4 right-4 text-xl text-body-text-color cursor-pointer"
            >
              {showPassword ? <LuEyeClosed /> : <LuEye />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-2 py-3 bg-primary-btn-bg rounded-md font-text-font cursor-pointer hover:bg-purple-300 transition duration-200 ease-in-out"
      >
        {isLogin ? "Sign in" : "Create Account"}
      </button>

      {isLogin ? (
        <span className="text-body-text-color">
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="text-purple-300">
            Register
          </Link>
        </span>
      ) : (
        <span className="text-body-text-color">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-300">
            Sign In
          </Link>
        </span>
      )}
    </form>
  );
};

export default AuthForm;
