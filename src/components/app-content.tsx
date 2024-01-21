import { Pause, Play, RotateCcw, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { DrawerTrigger } from "./ui/drawer";
import { useContext, useEffect, useState } from "react";
import { prettyPrintTime } from "@/lib/utils";
import { AppContext } from "@/lib/context";

enum TimerState {
  runningWork = "running-work",
  pausedWork = "paused-work",
  finishedWork = "finished-work",
  runningBreak = "running-break",
  pausedBreak = "paused-break",
  finishedBreak = "finished-break",
}

export function AppContent() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerState, setTimerState] = useState(TimerState.finishedBreak);
  const { time } = useContext(AppContext);

  useEffect(() => {
    setTimeElapsed(0);
    setTimerState(TimerState.finishedBreak);
  }, [time]);

  useEffect(() => {
    if (
      timerState === TimerState.finishedBreak ||
      timerState === TimerState.finishedWork
    ) {
      setTimeElapsed(0);
    }
  }, [timerState]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(time.work * 60, timeElapsed);
      if (
        timerState === TimerState.runningWork &&
        time.work * 60 <= timeElapsed
      ) {
        setTimerState(TimerState.finishedWork);
      } else if (
        timerState === TimerState.runningBreak &&
        time.break * 60 <= timeElapsed
      ) {
        setTimerState(TimerState.finishedBreak);
      } else if (
        timerState === TimerState.runningBreak ||
        timerState === TimerState.runningWork
      ) {
        setTimeElapsed((state) => state + 1);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [timerState, timeElapsed]);

  function toggleTimerState() {
    console.log(timerState);
    // console.log(
    //   "timerstate==paused:",
    //   timerState === TimerState.paused,
    //   "| work time: ",
    //   time.work * 60,
    //   "| time elapsed:",
    //   timeElapsed
    // );
    if (timerState === TimerState.runningBreak) {
      setTimerState(TimerState.pausedBreak);
    } else if (timerState === TimerState.runningWork) {
      setTimerState(TimerState.pausedWork);
    } else if (timerState === TimerState.pausedBreak) {
      setTimerState(TimerState.runningBreak);
    } else if (timerState === TimerState.pausedWork) {
      setTimerState(TimerState.runningWork);
    } else if (timerState === TimerState.finishedWork) {
      setTimerState(TimerState.runningBreak);
    } else if (timerState === TimerState.finishedBreak) {
      setTimerState(TimerState.runningWork);
    }
  }

  function retrieveToggleButtonText() {
    if (timerState === TimerState.finishedBreak) {
      return "Start Work";
    } else if (timerState === TimerState.finishedWork) {
      return "Start Break";
    } else if (timerState === TimerState.pausedWork) {
      return "Resume Work";
    } else if (timerState === TimerState.pausedBreak) {
      return "Resume Break";
    } else if (timerState === TimerState.runningBreak) {
      return "Pause Break";
    } else if (timerState === TimerState.runningWork) {
      return "Pause Work";
    }
  }

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
      <div className="flex flex-col items-center space-y-10">
        <h1 className="text-white/60 text-3xl">
          {retrieveToggleButtonText()?.split(" ")[1]}
        </h1>
        <h1 className="text-white font-semibold text-5xl min-w-64 text-center">
          {prettyPrintTime(timeElapsed)}
        </h1>
        <div className="flex space-x-4">
          <Button
            variant={"stylized"}
            size={"stylized"}
            onClick={() => toggleTimerState()}>
            {timerState === TimerState.runningBreak ||
            timerState === TimerState.runningWork ? (
              <Pause strokeWidth={1.5} />
            ) : (
              <Play strokeWidth={1.5} />
            )}
            <p>{retrieveToggleButtonText()}</p>
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
