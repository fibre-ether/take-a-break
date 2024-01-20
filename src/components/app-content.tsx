import { Pause, Play, RotateCcw, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { DrawerTrigger } from "./ui/drawer";
import { useContext, useEffect, useState } from "react";
import { prettyPrintTime } from "@/lib/utils";
import { AppContext } from "@/lib/context";

enum TimerState {
  running = "running",
  paused = "paused",
}

export function AppContent() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerState, setTimerState] = useState(TimerState.running);
  const { time } = useContext(AppContext);

  useEffect(() => {
    setTimeElapsed(0);
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(time.work * 60, timeElapsed);
      if (time.work * 60 <= timeElapsed + 1) {
        /* I know this will not reflect in the next if stmt
           But hopefully it will reflect by the next tick
        */
        setTimerState(TimerState.paused);
        console.log("timer state in if stmt:", timerState);
      }
      if (timerState === TimerState.running) {
        setTimeElapsed((state) => state + 1);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [timerState, time, timeElapsed]);

  return (
    <>
      <DrawerTrigger asChild>
        <Button
          variant={"stylized"}
          size={"stylized"}
          className="absolute left-1/2 -translate-x-1/2 top-5">
          <Settings />
          <p>Settings</p>
        </Button>
      </DrawerTrigger>
      <div className="flex flex-col items-center space-y-5">
        <h1 className="text-white font-semibold text-5xl">
          {prettyPrintTime(timeElapsed)}
        </h1>
        <div className="flex space-x-4">
          <Button
            variant={"stylized"}
            size={"stylized"}
            onClick={() =>
              setTimerState((state) =>
                state === TimerState.paused
                  ? TimerState.running
                  : TimerState.paused
              )
            }>
            {timerState === TimerState.running ? (
              <Pause strokeWidth={1.5} />
            ) : (
              <Play strokeWidth={1.5} />
            )}
            <p>{timerState === TimerState.running ? "Pause" : "Resume"}</p>
          </Button>
          <Button
            variant={"stylized"}
            size={"stylized"}
            onClick={() => setTimeElapsed(0)}>
            <RotateCcw strokeWidth={1.5} />
            <p>Reset</p>
          </Button>
        </div>
      </div>
    </>
  );
}
