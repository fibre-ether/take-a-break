import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { DrawerTrigger } from "./ui/drawer";
import { useEffect, useState } from "react";
import { prettyPrintTime } from "@/lib/utils";

export function AppContent() {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((state) => state + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DrawerTrigger asChild>
        <Button className="py-6 rounded-lg absolute left-1/2 -translate-x-1/2 top-5 text-white font-semibold text-lg flex items-center space-x-2 bg-slate-950/50">
          <Settings />
          <p>Settings</p>
        </Button>
      </DrawerTrigger>
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-white font-semibold text-5xl">
          {prettyPrintTime(timeElapsed)}
        </h1>
        {/* <Button onClick={() => notify()}>Click me</Button> */}
      </div>
    </>
  );
}
