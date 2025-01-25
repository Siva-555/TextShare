import { cn } from "@/lib/utils";
import React from "react";
import { CircleHelp, Share2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Header = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={cn("bg-zinc-700 text-white px-3 flex items-center", className)}>
      <div className="flex-1">
        <div className="text-2xl flex group w-fit items-center gap-2 cursor-pointer" onClick={()=>{navigate("/")}}>
          <span className="transition-all group-hover:-rotate-[360deg] duration-500"><Share2 /></span>
          <span className="font-semibold">TextShare</span>
        </div>
      </div>
      <div className="flex items-center cursor-pointer gap-1 mr-3 group" title="How it works">
        <span className="font-semibold hidden md:block">How It Works</span>

        <span className="transition-all group-hover:-rotate-[360deg] duration-500"><CircleHelp className="size-4" /></span>
        
      </div>
    </div>
  );
};

export default Header;
