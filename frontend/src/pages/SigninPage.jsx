import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SigninPage = () => {
  const [formData, setformData] = useState({
    email: '',
    password: ''
  })

  const { signin, isSigningIn } = useAuthStore()

  const handleChange = (e) => {
    e.preventDefault()
    signin(formData)
  }
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
            disabled={isSigningIn}
          >
            {isSigningIn ? (
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
            don't have a account <Link to="/signup">Sign up</Link>
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
  )
}

export default SigninPage