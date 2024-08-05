"use client";
import React, { useState } from "react";
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/logInSlice";
import { AppDispatch, RootState } from "@/store/store";

const SignInForm = () => {
  const users = useSelector((state: RootState) => state.auth.users);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    if (user) {
      console.log("You can login");
      dispatch(login({ user }));
    } else {
      console.log("Try again");
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90.2vh] text-[#0C0C0C] bg-[#F2613F]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#9B3922] text-[#0C0C0C] p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-[#0C0C0C] text-[#F2613F] py-2 px-4 rounded-md hover:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0C0C0C]"
        >
          Sign In
        </button>
        <div className="flex flex-col items-center pt-6">
          <h2>
            <b>Test Email:</b> test@test.com
          </h2>
          <h2>
            <b>Test Password:</b> test123
          </h2>
        </div>
        <div className="flex justify-center items-center pt-6">
          <h2><Link href="/signUp" className="font-bold">Sign Up</Link></h2>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
