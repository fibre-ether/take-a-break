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
      sendNotification("Tauri is awesome!");
      sendNotification({ title: "TAURI", body: "Tauri is awesome!" });
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-800 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-white font-semibold text-3xl">{timeElapsed}</h1>
        <Button onClick={() => notify()}>Click me</Button>
      </div>
    </div>
  );
}

export default App;
