"use client";

import {
  fetchContent,
  addContentToFirestore,
  deleteContentFromFirestore,
  selectAllContent,
  getContentStatus,
  getContentError,
} from "@/store/slices/contentSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

const Create = () => {
  const initialState = {
    title: "",
    author: "",
    description: "",
    videoFile: null as File | null,
  };

  const [formData, setFormData] = useState(initialState);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [previewed, setPreviewed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const author = useSelector((state: RootState) => state.isLogin.currentAuthor);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      author: author,
    }));
  }, [author]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      videoFile: file,
    });
  };

  const handlePreview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.videoFile) {
      const url = URL.createObjectURL(formData.videoFile);
      setVideoURL(url);
      setPreviewed(true);
    }
  };

  const handleFinalCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.videoFile) {
      setIsUploading(true);
      try {
        await dispatch(
          addContentToFirestore({
            title: formData.title,
            author: formData.author,
            description: formData.description,
            videoFile: formData.videoFile,
          }),
        ).unwrap();
        setFormData(initialState);
        setVideoURL(null);
        setPreviewed(false);
        router.push("/");
      } catch (error) {
        console.error("Error adding content to Firestore:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[90.2vh] text-[#0C0C0C] bg-[#F2613F] gap-20 max-lg:flex-col max-lg:h-auto max-lg:py-10 max-lg:gap-0">
      <form
        onSubmit={previewed ? handleFinalCreate : handlePreview}
        className="bg-[#9B3922] text-[#0C0C0C] p-8 rounded shadow-md w-full max-w-lg mb-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create</h2>
        <div className="mb-4">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Author:
            <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 bg-gray-100">
              {author}
            </div>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-[#0C0C0C] font-semibold mb-2">
            Video File:
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-[#0C0C0C] text-[#F2613F] py-2 px-4 rounded-md hover:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0C0C0C]"
        >
          {isUploading
            ? "Uploading..."
            : previewed
            ? "Finalize Creation"
            : "Preview Video"}
        </button>
      </form>
      {videoURL && previewed && (
        <div className="bg-[#9B3922] text-[#0C0C0C] p-4 rounded shadow-md w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4">Video Preview:</h3>
          <video
            controls
            src={videoURL}
            className="w-full rounded-md shadow-sm"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Create;
