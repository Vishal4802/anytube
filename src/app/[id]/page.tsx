"use client";
import { ContentItem } from "@/props/props";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const params = useParams();
  const content = useSelector((state: RootState) => state.content.content);
  const particular = content.filter(
    (cont: ContentItem) => cont.id == params.id,
  );
  console.log(particular);
  return (
    <main className="flex py-20 px-24 justify-start h-[89.7vh] items-center gap-20 text-[#0C0C0C] bg-[#F2613F] max-lg:flex-col max-lg:h-[100%] max-lg:gap-0 max-md:py-0 max-md:px-0 max-md:pb-28 max-md:items-start">
      <div className="video w-[60rem] h-[30rem] rounded-lg max-xl:w-[50rem] max-xl:h-[25rem] max-md:w-[100vw] max-md:h-[45vh] max-md:rounded-none">
        <video
          className="w-[100%] h-[100%] object-cover rounded-lg max-md:rounded-none"
          controls
          autoPlay
        >
          <source src={particular[0].source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col relative justify-start items-start gap-2 w-[25%] h-[55vh] overflow-hidden max-lg:w-[70%] max-lg:overflow-visible max-lg:h-[100%] max-lg:mt-2 max-lg:pb-10 max-lg:text-start max-md:w-[100%] max-md:gap-4 max-md:pl-2">
        <h2 className="text-3xl font-bold">{particular[0].title}</h2>
        <p className="text-md">Posted by {particular[0].author}</p>
        <p className="text-xl font-semibold">Description:</p>
        <p className="text-sm">{particular[0].description}</p>
        <Link
          href="/"
          className="bg-[#0C0C0C] text-[#F2613F] absolute left-0 bottom-0 px-2 py-1 rounded-lg"
        >
          Watch More
        </Link>
      </div>
    </main>
  );
}
