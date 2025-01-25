import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import {
  CircleX,
  Edit,
  Eye,
  FileClock,
  House,
  Pencil,
  SendHorizontal,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import TextShareComponent from "@/components/common/TextShareComponent";
import redirectUrl from "../redirectURL";

const TextSharePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [deleteloading, setDeleteloading] = useState(false);

  const [textShareData, setTextShareData] = useState(null);
  const [screenType, setScreenType] = useState({ type: "new" });
  const [showAlert, setShowAlert] = useState({ show: false, title: "", description:"", onClick: ()=>{} });


  let params = useParams();

  useEffect(() => {
    let pathname = window.location.pathname;
    console.log("rrf", params);

    if (pathname === "/createTextShare") {
      setLoading1(false)
      setScreenType({ type: "new" });
      return;
    } else if (pathname.includes("/textShare" && params.id)) {

      setLoading1(true);
      redirectUrl
          .get("/api/testShare", { params: { code: params.id }})
          .then((res) => {
            setLoading1(false);
            if (res.status === 200 && res.data.valid && res.data.records && res.data.records?.length > 0) {
              let records = res.data.records;

              if(records[0].admin_code === params.id){
                setScreenType({ type: "admin", write: true });
              } else if(records[0].user_code === params.id){
                setScreenType({ type: "user", write: records[0].write ? true : false });
              }
              setTextShareData(records[0]);
            }else{
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
      
            setLoading1(false);
            navigate("/");
            console.log("error - ", err);
          });
    }

    
  }, []);

  const onFormSubmitHandler = (data) => {
    setLoading(true);

    if(data.uid){
      redirectUrl
        .post("/api/updateTestShare", data)
        .then((res) => {
          setLoading(false);
          if (res.status === 200 && res.data.done) {
            // toast({
            //   title: "Success.",
            //   description: "Your text has been successfully updated.",
            //   className:"bg-green-600 text-white"
            // })
            setShowAlert(
              { show: true, title: "Success.", description:"Your text has been successfully updated.", 
                className: "bg-green-600 hover:bg-green-800 text-white",
                onClick: ()=>{navigate(`/`);} 
              });
            // navigate(`/`);
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
              description: `${err.response.data.error || err.response.data.msg}`,
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
    else{
      redirectUrl
        .post("/api/createTestShare", data)
        .then((res) => {
          setLoading(false);
          if (res.status === 200 && res.data.uid) {
            navigate(`/textShare/success/${res.data.uid}`);
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
  };

  const onDeleteHandler = (data)=>{
    if(data.uid){
      setDeleteloading(true);

      redirectUrl
        .post("/api/updateTestShare", data)
        .then((res) => {
          setDeleteloading(false);
          if (res.status === 200 && res.data.done) {
            toast({
              title: "Success.",
              description: "Your text has been successfully deleted.",
              className:"bg-green-600 text-white"
            })
            navigate(`/`);
          }
          else{
            toast({
              variant: "destructive",
              title: "Failed",
              description:
                "Something went wrong, Please try again later.",
            });
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
  
          setDeleteloading(false);
          console.log("error - ", err);
        });
    }
  }

  if(loading1){
    return <div className="size-full py-20 flex justify-center items-center bg-slate-200">
      <div className="max-w-xl w-3/4 p-4 shadow-2xl rounded-md bg-white">
        <Skeleton className="min-h-44 bg-slate-300" />
        <div className="flex justify-between mt-3">
          <Skeleton className="h-5 w-2/4 bg-slate-300" />
          <Skeleton className="h-5 w-1/4 bg-slate-300" />
        </div>
        <div className="flex justify-between mt-3">
          <Skeleton className="h-5 w-[57%]  bg-slate-300" />
          <Skeleton className="h-5 w-[24%] bg-slate-300" />
        </div>
        <div className="flex justify-between mt-3">
          <Skeleton className="h-5 w-[45%]  bg-slate-300" />
          <Skeleton className="h-5 w-1/4 bg-slate-300" />
        </div>
        <div className="flex justify-between mt-6">
          <Skeleton className="h-9 w-1/4 bg-slate-300" />
          <Skeleton className="h-9 w-1/4 bg-slate-300" />
        </div>
      </div>
    </div>
  }

  const onCloseAlert = ()=>{
    showAlert.onClick();
    setShowAlert({ show: false, title: "", description:"", onClick: ()=>{} })
  }
  return (
    <div className="size-full py-20 flex justify-center items-center bg-slate-200">
      <AlertDialog open={showAlert.show}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="w-4/5" >
          <AlertDialogHeader>
            <AlertDialogTitle>{showAlert.title}</AlertDialogTitle>
            <AlertDialogDescription>{showAlert.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-center items-center">
            <AlertDialogAction className={showAlert?.className || ""} onClick={onCloseAlert}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {
        params?.id  ?
        <TextShareComponent 
          type={screenType.type} 
          write ={screenType.type === "user" ? screenType.write : true}
          loading={loading} 
          deleteloading={deleteloading}
          textShareData={textShareData}
          onSubmit={onFormSubmitHandler} 
          onDelete={onDeleteHandler}
          onCancel={() => navigate("/")} 
        />
        :
        <TextShareComponent 
          type={screenType.type} 
          loading={loading} 
          write={true}
          onSubmit={onFormSubmitHandler} 
          onCancel={() => navigate("/")} 
        />
      }
    </div>
  );
};

export default TextSharePage;
