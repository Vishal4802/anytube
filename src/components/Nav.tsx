"use client";
import { logout } from "@/store/slices/logInSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const Nav: FC = () => {
  const isLogIn = useSelector((data: RootState) => data.isLogin.isLogIn);
  console.log(isLogIn);
  const author = useSelector((data: RootState) => data.isLogin.currentAuthor);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <div className="w-[100%] flex py-4 px-32 justify-between items-center bg-[#0C0C0C] text-[#F2613F] max-md:px-10 max-md:relative">
      <div>
        <Link href="/">
          <h2 className="text-2xl m-0 p-0">AnyTube</h2>
        </Link>
      </div>

      <ul className="flex p-2 justify-between items-center gap-4">
        {!isLogIn ? (
          <>
            <li>
              <Link href="/signUp">Sign Up</Link>
            </li>
            <li>
              <Link href="/">Sign In</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/create">Create</Link>
            </li>
            <li>
              <Link onClick={handleSignOut} href="/">
                Sign Out
              </Link>
            </li>
            <li className="rounded-full bg-[#f2f2f2] text-[#0C0C0C] flex justify-center items-center w-[30px] h[30px] text-lg font-semibold">
              {author[0]}
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
