import React, { useState } from "react";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { login } from "../../api/auth";

// Properties
import properties from "properties.json";

// Assets
import { envelopeIcon, lockIcon, spinnerIcon } from "../../helpers/icons";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");
    setLoading(true);
    const loggingIn = await login(email, password);
    setLoading(false);
    if (!loggingIn.success) {
      loggingIn.errors.forEach((error) => toast.error(error));
      return;
    }
    cookies.set(properties.storage.cookie_name, loggingIn.data.token);
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-screen">
      <div className="max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <img
            src={require(`assets/${properties.appearence.logo}`)}
            alt="Timezones App"
            className="max-w-[200px] max-h-48 mix-blend-darken"
          />
        </div>
        <div className="flex flex-col px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-bold text-gray-600 sm:text-2xl dark:text-white">
            Login To Your Admin Account
          </div>
          <div className="mt-8">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    {envelopeIcon()}
                  </span>
                  <input
                    type="text"
                    className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-dimmed focus:border-transparent"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    {lockIcon()}
                  </span>
                  <input
                    type="password"
                    className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-dimmed focus:border-transparent"
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4 bg-primary hover:bg-slate-500 focus:ring-primary focus:ring-offset-primary-dimmed text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  {loading
                    ? spinnerIcon("fill-primary text-gray-200", 24, 24)
                    : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
