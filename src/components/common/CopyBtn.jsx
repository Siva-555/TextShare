import React, { useState, forwardRef } from "react";
import { Check, Copy, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"

const CopyBtn = ({ text, className, Icon=Copy }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if(!copied){
        console.log("test")
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCopy}
      className={cn("relative  overflow-hidden w-10 h-10", className)}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out",
          copied ? "translate-y-full" : "translate-y-0"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out",
          copied ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Check className="h-4 w-4 text-green-500" />
      </span>
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
    </Button>
  );
};

export default CopyBtn;
