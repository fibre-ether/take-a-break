import { Pause, Play, RotateCcw, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import { useContext, useEffect, useState } from "react";
import { notify, prettyPrintTime } from "@/lib/utils";
import { AppContext } from "@/lib/context";
import { toast } from "sonner";
import AppDrawerContent from "./app-drawer-content";
import { setTimeout, clearTimeout } from "worker-timers";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { time } = useContext(AppContext);

  useEffect(() => {
    setTimeElapsed(0);
    setTimerState(TimerState.finishedBreak);
  }, [time]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        timerState === TimerState.runningWork &&
        time.work * 60 <= timeElapsed
      ) {
        setTimerState(TimerState.finishedWork);
        notify("Work time is up", "Start break timer");
      } else if (
        timerState === TimerState.runningBreak &&
        time.break * 60 <= timeElapsed
      ) {
        setTimerState(TimerState.finishedBreak);
        notify("Break time is up", "Start work timer");
      } else if (
        timerState === TimerState.runningBreak ||
        timerState === TimerState.runningWork
      ) {
        setTimeElapsed((state) => state + 1);
      } else if (
        timerState === TimerState.finishedBreak ||
        timerState === TimerState.finishedWork
      ) {
        setTimeElapsed(0);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [timerState, timeElapsed]);

  function toggleTimerState() {
    console.log(timerState);
    if (time.work <= 0 || time.break <= 0) {
      toast.custom(() => (
        <div className="bg-black border-2 p-4 rounded-lg border-slate-500 flex items-center flex-1">
          <div>
            <h1 className="text-base text-white">Please setup timer</h1>
            <p className="text-xs text-muted-foreground">
              Work or Break timer is not set
            </p>
          </div>
          <Button
            variant={"stylized"}
            className="ml-6 text-sm p-2"
            onClick={() => {
              {
                setDrawerOpen(true);
                toast.dismiss();
              }
            }}>
            Show me
          </Button>
        </div>
      ));
    } else if (timerState === TimerState.runningBreak) {
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

  function resetTimer() {
    setTimeElapsed(0);
    if (timerState === TimerState.runningBreak) {
      setTimerState(TimerState.pausedBreak);
    } else if (timerState === TimerState.runningWork) {
      setTimerState(TimerState.pausedWork);
    }
  }

  function retrieveCurrentTime() {
    const result =
      retrieveToggleButtonText()?.split(" ")[1] === "Work"
        ? time.work * 60 - timeElapsed
        : time.break * 60 - timeElapsed;
    return result;
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
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
          {prettyPrintTime(retrieveCurrentTime())}
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
            onClick={() => resetTimer()}>
            <RotateCcw strokeWidth={1.5} />
            <p>Reset</p>
          </Button>
        </div>
      </div>
      <AppDrawerContent drawerOpen={drawerOpen} />
    </Drawer>
  );
}
