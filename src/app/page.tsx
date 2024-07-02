"use client";
import ContentList from "@/components/ContentList";
import { useSelector, useDispatch } from "react-redux";
import SignInForm from "./signIn/page";
import { useState, useEffect } from "react";
import { fetchContent } from "@/store/slices/contentSlice";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUsers } from "@/store/slices/authSlice";

export default function Home() {
  const [search, setSearch] = useState("");
  const content = useSelector((state: RootState) => state.content.content);
  const isLogIn = useSelector((state: RootState) => state.isLogin.isLogIn);
  const contentStatus = useSelector((state: RootState) => state.content.status);
  const dispatch = useDispatch<AppDispatch>();
  const [filteredContent, setFilteredContent] = useState<any[]>([]);

  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(fetchContent());
      dispatch(fetchUsers());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (content) {
      const filtered = content.filter(
        (data: any) =>
          data.title.toLowerCase().includes(search.toLowerCase()) ||
          data.description.toLowerCase().includes(search.toLowerCase()) ||
          data.author.toLowerCase().includes(search.toLowerCase()),
      );
      const sorted = filtered.sort((a: any, b: any) => b.id - a.id);
      setFilteredContent(sorted);
    }
  }, [content, search]);

  if (!isLogIn) {
    return <SignInForm />;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (contentStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex items-start justify-around text-[#0C0C0C] bg-[#F2613F] h-[100%]">
      <div className="flex flex-col p-2 py-16 justify-start items-start gap-2 w-[70%]">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full m-2 mb-4 mt-0 px-4 py-2 border-2 border-[#9B3922] rounded-md focus:outline-none focus:border-[#481E14] bg-inherit text-[#0C0C0C] placeholder-[#9B3922]"
        />
        {filteredContent &&
          filteredContent.map((data: any) => (
            <ContentList data={data} key={data.id} />
          ))}
      </div>
    </main>
  );
}
