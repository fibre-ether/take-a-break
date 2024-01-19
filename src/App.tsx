import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";

function App() {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((state) => state + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const notify = async () => {
    console.log("reached notify func");
    let permissionGranted = await isPermissionGranted();
    console.log("1st permissions status:", permissionGranted);
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
    if (permissionGranted) {
      sendNotification({ title: "TAURI", body: "Tauri is awesome!" });
    }
  };

  // https://stackoverflow.com/a/11486026
  const prettyPrintTime = (duration: number) => {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";

    ret += hrs < 10 ? "0" + hrs : hrs;
    ret += " : ";
    ret += mins < 10 ? "0" + mins : mins;
    ret += " : ";
    ret += secs < 10 ? "0" + secs : secs;

    return ret;
  };

  return (
    <div className="h-screen w-screen bg-slate-800 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-white font-semibold text-5xl">
          {prettyPrintTime(timeElapsed)}
        </h1>
        <Button onClick={() => notify()}>Click me</Button>
      </div>
    </div>
  );
}

export default App;
