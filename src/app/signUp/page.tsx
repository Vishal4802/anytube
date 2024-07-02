"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addUserToFirestore } from "@/store/slices/authSlice";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(
        addUserToFirestore({
          author: formData.author,
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();

      console.log("Sign-up data submitted:", formData);
      setFormData({
        author: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90.2vh] text-[#0C0C0C] bg-[#F2613F]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#9B3922] text-[#0C0C0C] p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && (
          <div className="mb-4 text-red-500 font-semibold">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Name:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </label>
        </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
