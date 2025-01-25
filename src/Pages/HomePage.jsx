import React, {useState} from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronRight, ClipboardType, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import redirectUrl from "../redirectURL";

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [textCode, setTextCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    msg: "TextCode is Expired",
  })

  const onTextCodeChange = (e)=>{
    let value = e.target.value;
    value = value || value.trim();
    setTextCode(value);
  }
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    setLoading(true);

    redirectUrl
      .get("/api/testShare", { params: { code: textCode }})
      .then((res) => {
        setLoading(false);
        if (res.status === 200 && res.data.valid) {
          navigate(`/textShare/${textCode}`);
        }
        else{
          setError({ show: true, msg: res.data.msg || ""})
        }
      })
      .catch((err) => {
        if (err.status === 500 && err?.response?.data?.db_error) {
          toast({
            variant: "destructive",
            title: "Connection Failed",
            description:
              "Unable to connect to the database at the moment. Please try again later.",
          });
        } else if (err.status === 400) {
          toast({
            variant: "destructive",
            title: "Bad Request - 400",
            description: `${err.response.data.error}`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Unknown",
            description: "Something went wrong, please try again later",
          });
        }
  
        setLoading(false);
        console.log("error - ", err);
      });
  }


  return (
    <div className="size-full py-20 flex justify-center items-center">
      <Card className=" max-w-lg w-3/4 shadow-xl">
        <CardContent className="pt-6 flex flex-col justify-center items-center">
          <form className="w-full" onSubmit={onSubmitHandler}>
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full gap-4">
                <Input id="textcode" className="text-xs" required placeholder="Enter TextCode" value={textCode} maxLength={25} onChange={onTextCodeChange}/>
                <Tooltip >
                  <TooltipTrigger asChild>  
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      size="icon" 
                      className="min-w-10 group hover:shadow-md" 
                      disabled={loading} 
                    >
                      {loading ? <Loader2 className="animate-spin" />
                         : <span className="transition-all group-hover:-rotate-[360deg] duration-500"><ChevronRight /></span>
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Submit</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {error.show ?
              <div className="text-red-600 font-semibold px-2 pt-2 text-sm truncate">
                {error.msg}
              </div> :
              <div className="text-muted-foreground  px-2 pt-2 text-sm truncate">
                eg: aytedhr
              </div>
              }
            </div>
          </form>
          <div className="flex items-center gap-4 my-4 text-sm font-light text-muted-foreground">
            <Separator className="w-4" />
            <span>or</span>
            <Separator className="w-4" />
          </div>
          
          <Button 
            className="flex group items-center hover:shadow-xl w-full" 
            onClick={()=>navigate("/createTextShare")}
            disabled={loading} 
          > 
            <span>Create TextBox </span>
            <span className="transition-all group-hover:-rotate-[360deg] duration-500"><ClipboardType /></span>
          </Button>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default HomePage;
