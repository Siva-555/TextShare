import React, { useState, useEffect } from "react";

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
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import CopyBtn from "@/components/common/CopyBtn";
import {
  Link,
  Users,
  LockKeyhole,
  ClipboardType,
  PartyPopper,
  House,
  FileClock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getShareURL } from "@/utils/utilis";
import redirectUrl from "../redirectURL";


const SuccessPage = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);

  let params = useParams();

  useEffect(()=>{
    console.log(params)
    if(!params?.id){
      navigate("/");
      return;
    }

    setLoading(true);
    redirectUrl
      .get("/api/testShare",{ params: { uid: params.id }})
      .then((res) => {
        setLoading(false);
        if (res.status === 200 && res.data.valid && res.data.records && res.data.records?.length > 0) {
          setRecord(res.data.records[0]);
        }
        else{
          navigate("/");
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
        navigate("/");
        console.log("error - ", err);
      });

  },[])

  if (loading) {
    return (
      <div className="size-full  py-20 flex justify-center items-center bg-slate-200">
        <Card className=" max-w-xl w-3/4  shadow-xl bg-white">
          <CardHeader>
            <Skeleton className="h-4 w-3/5 bg-slate-300" />
            <CardDescription>
              <Skeleton className="h-4 w-3/4 bg-slate-300 rounded-sm" />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center">
            <div className="w-full">
              <div className="font-semibold flex flex-col items-center pl-1 p-2">
                <div className="flex items-center gap-2">
                  <span>Admin Code</span>
                  <LockKeyhole className="size-4" />
                </div>
              </div>
              <Skeleton className="h-8 w-full bg-slate-300" />
            </div>
            {/* User Code  */}
            <div className="w-full">
              <div className="font-semibold flex flex-col items-center  pl-1 p-2">
                <div className="flex items-center gap-2">
                  <span>User Code</span>
                  <Users className="size-4" />
                </div>
              </div>
              <Skeleton className="h-8 w-full bg-slate-300" />
            </div>
            <div className="flex justify-end mt-4 w-full italic">
              <Skeleton className="h-4 w-3/4 bg-slate-300" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-1">
            <Button
              variant="outline"
              className="flex group transition-shadow items-center shadow-sm hover:shadow-xl"
              onClick={() => navigate("/")}
            >
              <span className="transition-all group-hover:-rotate-[360deg] duration-500">
                <House />
              </span>
              <span className="hidden md:block">Go to Homepage</span>
            </Button>
            <Button
              className="flex group items-center hover:shadow-xl "
              onClick={() => navigate("/createTextShare")}
            >
              <span>Create New TextBox </span>
              <span className="transition-all group-hover:-rotate-[360deg] duration-500">
                <ClipboardType />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div className="size-full  py-20 flex justify-center items-center bg-slate-200">
      <Card className=" max-w-xl w-3/4  shadow-xl bg-white">
        <CardHeader>
          {
            <CardTitle className="text-lg md:text-2xl">
              Your text has been successfully submitted.
            </CardTitle>
          }
          <CardDescription>
            <div className="flex items-center flex-wrap space-x-1 mt-2">
              <div className="flex flex-row gap-1">
                <FileClock className="h-4 w-4" />
                <span>Expires On:</span>
              </div>
              <div className="">
                {" "}
                {moment().format("MMMM Do, YYYY, h:mm A")}{" "}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          {/* Admin Code  */}
          <div className="w-full">
            <div className="font-semibold flex flex-col items-center pl-1 p-2">
              <div className="flex items-center gap-2">
                <span>Admin Code</span>
                <LockKeyhole className="size-4" />
              </div>
            </div>
            <div className="border-2 text-sm flex justify-between items-center shadow-inner bg-neutral-100 rounded-md px-2 py-1  ">
              <span className="truncate">{record.admin_code}</span>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      {" "}
                      <CopyBtn
                        className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200"
                        text={record.admin_code}
                      />{" "}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Admin Code</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      {" "}
                      <CopyBtn
                        className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200"
                        text={getShareURL(record.admin_code)}
                        Icon={Link}
                      />{" "}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Link</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          {/* User Code  */}
          <div className="w-full">
            <div className="font-semibold flex flex-col items-center  pl-1 p-2">
              <div className="flex items-center gap-2">
                <span>User Code</span>
                <Users className="size-4" />
              </div>
            </div>
            <div className="border-2 text-sm flex justify-between items-center shadow-inner bg-neutral-100 rounded-md px-2 py-1  ">
              <span className="truncate">{record.user_code}</span>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      {" "}
                      <CopyBtn
                        className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200"
                        text={record.user_code}
                      />{" "}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy User Code</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <CopyBtn
                        className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200"
                        text={getShareURL(record.user_code)}
                        Icon={Link}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Link</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 w-full italic">
            <span className="text-xs md:text-sm text-gray-400">
              Use above codes on the homepage to manage your text as an admin or
              user.
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-1">
          <Button
            variant="outline"
            className="flex group transition-shadow items-center shadow-sm hover:shadow-xl"
            onClick={() => navigate("/")}
          >
            <span className="transition-all group-hover:-rotate-[360deg] duration-500">
              <House />
            </span>
            <span className="hidden md:block">Go to Homepage</span>
          </Button>
          <Button
            className="flex group items-center hover:shadow-xl "
            onClick={() => navigate("/createTextShare")}
          >
            <span>Create New TextBox </span>
            <span className="transition-all group-hover:-rotate-[360deg] duration-500">
              <ClipboardType />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
