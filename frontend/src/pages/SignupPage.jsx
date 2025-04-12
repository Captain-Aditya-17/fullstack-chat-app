import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid");
    if (!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters long")

      return true;
  };

  const handleChange = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success === true) signup(formData)
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="text-primary size-6" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            </div>
          </div>
          <form onSubmit={handleChange} className="space-y-6">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" />
              </div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={(e) =>
                  setformData({ ...formData, fullname: e.target.value })
                }
                className="input input-bordered w-full pl-10 outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-white" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                  className="input input-bordered w-full pl-10 outline-none"
                  placeholder="your@example.com"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full pl-10 outline-none"
                  placeholder="******************"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> loading.....
                </>
              ) : (
                <>
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content">
              Already have a account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side image */}

      <AuthImagePattern
        title="Join out community"
        subtitle="Create an account to get started with our services. Enjoy exclusive features and benefits by signing up today!"
      />
    </div>
  );
};

export default SignupPage;
