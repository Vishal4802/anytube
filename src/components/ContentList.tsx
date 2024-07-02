"use client";
import React, { FC } from "react";
import ContentListProps from "@/props/props";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteContentFromFirestore } from "@/store/slices/contentSlice";
import { RootState, AppDispatch } from "@/store/store";

const ContentList: FC<ContentListProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentAuthor = useSelector(
    (state: RootState) => state.isLogin.currentAuthor,
  );

  const deleteVideo = () => {
    dispatch(deleteContentFromFirestore(data.id));
  };

  return (
    <div className="flex p-2 h[16vw] justify-start items-start gap-20 max-lg:relative max-md:flex-col max-md:gap-0">
      <div className="video w-[25vw] h-[15vw] rounded-lg max-xl:w-[30vw] max-xl:h-[18vw] max-lg:w-[35vw] max-lg:h-[21vw] max-md:w-[66vw] max-md:h-[39vw]">
        <Link href={"./" + data.id}>
          <video className="w-[100%] h-[100%] object-cover rounded-lg" controls>
            <source src={data.source} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Link>
      </div>
      <div className="flex flex-col w-[25vw] justify-around items-start gap-6 mt-6 max-md:w-[66vw]">
        <Link href={"./" + data.id}>
          <h2 className="mb-4 text-2xl font-bold max-xl:text-xl">
            {data.title}
          </h2>
          <p className="mb-4 text-sm max-xl:text-xs max-lg:hidden">
            Posted by {data.author}
          </p>
          <h4 className="w-60 text-sm opacity-80 max-xl:text-xs max-lg:hidden">
            {data.description.slice(0, 100)}...
          </h4>
        </Link>
      </div>

      {currentAuthor === data.author && (
        <button
          className="btn btn-danger mt-7 border-[#0C0C0C] text-[#0C0C0C] bg-[#9B3922] hover:bg-[#ab3f27] focus:outline-none focus:ring-4 focus:ring-[#9B3922] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 max-lg:absolute max-lg:right-0 max-lg:bottom-2"
          onClick={deleteVideo}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ContentList;
