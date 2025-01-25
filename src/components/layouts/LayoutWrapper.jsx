import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster"
import Header from "./Header";

const LayoutWrapper = () => {
  return (
    <div className="min-h-screen h-full w-full bg-slate-200">
      <TooltipProvider delayDuration={0}>
        <Header className="h-12 " />
        <div className="size-full">
          <Outlet />
          <Toaster />
        </div>
      </TooltipProvider>
      {/* <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="p-3">
          <SidebarTrigger/>
          <div className="p-2">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider> */}
        
    </div>
  );
};

export default LayoutWrapper;
