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
import {
  CircleX,
  Edit,
  Eye,
  FileClock,
  House,
  Pencil,
  SendHorizontal,
  Loader2,
  Trash2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EXPIRES_OPTIONS = [
  { value: 1, label: "1 day" },
  { value: 3, label: "3 days" },
  { value: 7, label: "7 days" },
  { value: 14, label: "14 days" },
  { value: 28, label: "28 days" },
];

const TextShareComponent = ({ type, loading, textShareData, onSubmit,onDelete,deleteloading, onCancel, write }) => {
  const [text, setText] = useState(textShareData?.text || "");
  const [access, setAccess] = useState({ read: true, write: textShareData?.write ?? false });
  const [expire, setExpire] = useState(1);

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onAccessChangeHandler = (name, bool) => {
    setAccess((prev) => {
      return { ...prev, [name]: bool };
    });
  };
  const onExpireChangeHandler = (v) => {
    let value = parseInt(v);
    setExpire(value);
  };

  const onFormSubmitHandler = (e)=>{
    e.preventDefault();

    let data = {};

    data.text = text;
    if(type === "new"){
        data.read = access.read ? 1 : 0;
        data.write = access.write ? 1 : 0;
        data.expire_days = expire;
        data.expire_time = moment().add(expire, "days").format("YYYY-MM-DD HH:mm:ss");
        console.log("rrr", data);

        onSubmit(data);
    }
    else{
      data.uid = textShareData.uid;
      if(type==="admin"){
        data.write = access.write ? 1 : 0;
      }
      data.type = type;
      onSubmit(data);
    }
  }

  const onDeleteHandler = ()=>{
    let data = {}

    if(textShareData.uid){
      data.uid = textShareData.uid;
      data.delete = 1;
      onDelete(data);
    }
  }

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="max-w-xl w-3/4 p-4 shadow-2xl rounded-md bg-white"
    >
      <div className="flex flex-row justify-between">
        <div className="flex text-xl items-center justify-between gap-1 ml-2 font-semibold w-full">
        {type === "new" && ( <> <span>New</span> </> )}
        
        {["admin", "user"].includes(type) && (
          <>
              {(write) ? ( <div className="flex items-center gap-1"> <span>Edit</span> <Pencil className="size-4" /> </div> ) : 
                <span>View</span> 
              }
            <div className="flex items-center justify-end text-xs md:text-sm flex-wrap space-x-1 italic ">
                <div className="flex flex-row gap-1">
                <span>Expires On:</span>
                </div>
                <div className="text-gray-400 ">
                {textShareData?.expire_time
                    ? moment(textShareData?.expire_time).format("MMMM Do, YYYY, h:mm A")
                    : ""}
                </div>
            </div>
          </>
        )}
        </div>
    </div>

      {/* textshare input */}
      <div className="mt-4">
        <Textarea
          placeholder="Enter Text ..."
          value={text}
          onChange={onTextChange}
          className="min-h-44"
          required
          readOnly={!write}
        />
      </div>
      { write && <div className="text-muted-foreground text-right italic px-2 pt-2 text-xs md:text-sm truncate">
        Note: Do not enter sensitive information
      </div>}

      {/* textshare options */}
      {["admin", "new"].includes(type) && <div className="px-4 pt-3 my-4 flex flex-col gap-3 ">
        <div className="flex items-center justify-between space-x-2">
          <Label
            htmlFor="read-access"
            className="flex items-center space-x-2 text-xs md:text-sm "
          >
            <Eye className="h-4 w-4" /> <span>Read Access</span>
          </Label>
          <Switch
            id="read-access"
            checked={access.read}
            disabled
            onCheckedChange={(bool) => {
              onAccessChangeHandler("read", bool);
            }}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label
            htmlFor="write-access"
            className="flex items-center space-x-2 text-xs md:text-sm "
          >
            <Edit className="h-4 w-4" /> <span>Write Access</span>
          </Label>
          <Switch
            id="write-access"
            checked={access.write}
            onCheckedChange={(bool) => {
              onAccessChangeHandler("write", bool);
            }}
          />
        </div>

        {type == "new" && <div className="flex items-center flex-wrap justify-between space-x-2 mt-2">
          <div className="flex flex-row gap-2">
            <Label
              htmlFor="expires-date"
              className="flex items-center space-x-2 text-xs md:text-sm "
            >
              <FileClock className="h-4 w-4" />
              <span>Expires On:</span>
            </Label>
            <Select
              id="expires-date"
              value={expire}
              onValueChange={onExpireChangeHandler}
            >
              <SelectTrigger className="w-[100px] h-[25px]">
                <SelectValue placeholder="Expire" />
              </SelectTrigger>
              <SelectContent>
                {EXPIRES_OPTIONS.map((ele, ind) => {
                  return (
                    <SelectItem key={`${ele.value}-${ind}`} value={ele.value}>
                      {ele.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="p-2 text-sm md:text-sm">
            {moment().add(expire, "days").format("MMMM Do, YYYY, h:mm A")}
          </div>
        </div>}
      </div>}

      {/* submit input */}
      <div className="flex flex-row justify-between mt-4">
        <div className="flex flex-row gap-1">
        {type==="admin" && <AlertDialog >
          <AlertDialogTrigger asChild>
            <span>
              <Tooltip >
                <TooltipTrigger asChild>  
                  <Button 
                    variant="destructive"
                    type="button"
                    size="icon" 
                    className="flex group transition-shadow items-center shadow-sm hover:shadow-xl"
                    // onClick={onDelete}
                    disabled={deleteloading || loading} 
                  >
                    {deleteloading ? <Loader2 className="animate-spin" />
                        : <span className="transition-all group-hover:-rotate-[360deg] duration-500"><Trash2 /></span>
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent> <p>Delete</p> </TooltipContent>
              </Tooltip>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your text.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={onDeleteHandler}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>}
          
          <Button
            variant="outline"
            type="button"
            className="flex group transition-shadow items-center shadow-sm hover:shadow-xl"
            onClick={onCancel}
            disabled={loading || deleteloading}
          >
            <span className="transition-all group-hover:-rotate-[360deg] duration-500">
              <House />
            </span>
            <span className="hidden md:block">Go to Homepage</span>
          </Button>

        </div>
       { write && <Button
          type="submit"
          className="flex group/sendbtn transition-shadow items-center hover:shadow-xl"
          disabled={loading || deleteloading}
        >
          <span>Submit</span>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="transition-all group-hover/sendbtn:-rotate-45">
              <SendHorizontal />
            </span>
          )}
        </Button>}
      </div>
    </form>
  );
};

export default TextShareComponent;
