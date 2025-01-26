import React from "react";

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
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Loader2 } from "lucide-react";
  
var clearTimeoutId;
export default class ErrorComponet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false, // Tracks if an error has occurred
      error: null,
      errorInfo: null,
      loading: false,
    };
  }
  // Called when an error is thrown in a child component
  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to show fallback UI
  }

  // Logs the error details
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  onReload = ()=>{
    this.setState({loading:true});
    if(clearTimeoutId) clearTimeout(clearTimeoutId)

    clearTimeoutId = setTimeout(()=>{
        this.setState({loading: false});
        window.location.reload()
    },500)
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI
      return (
        <div className="w-screen h-screen bg-slate-300 py-20 flex justify-center items-center">
            <Card className=" max-w-lg w-3/4 shadow-xl">
                <CardHeader>
                    <CardTitle>Something went wrong.</CardTitle>
                    <CardDescription>We're sorry for the inconvenience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Details</AccordionTrigger>
                            <AccordionContent>
                                <div className="text-red-700">
                                {this.state.error && this.state.error.toString()}
                                </div>
                                <div className="text-red-500">
                                    {this.state.errorInfo?.componentStack}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </CardContent>
                <CardFooter>
                    <Button type="button" disabled={this.state.loading} onClick={this.onReload}>
                    {this.state.loading && <Loader2 className="animate-spin" />}    Reload Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
      );
    }

    // Render children if no error occurred
    return this.props.children;
  }
}
