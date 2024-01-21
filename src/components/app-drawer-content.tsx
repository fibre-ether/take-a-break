import { MinusCircle, PlusCircle } from "lucide-react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/lib/context";

function AppDrawerContent({ drawerOpen }: { drawerOpen: boolean }) {
  const { time, setTime } = useContext(AppContext);
  const [workCount, setWorkCount] = useState(time.work);
  const [breakCount, setBreakCount] = useState(time.break);

  useEffect(() => {
    setWorkCount(time.work);
    setBreakCount(time.break);
    /* This dependency overwrites any unsaved values that were written when drawer was last closed */
  }, [drawerOpen]);

  return (
    <DrawerContent className="mb-4 bg-app-background border-slate-700">
      <DrawerHeader className="text-white flex flex-col items-center">
        <DrawerTitle>Setup timer</DrawerTitle>
        <DrawerDescription>
          Adjust work and break time in minutes
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex justify-around items-center space-x-3">
        <Counter count={workCount} setCount={setWorkCount} subtitle="Work" />
        <Counter count={breakCount} setCount={setBreakCount} subtitle="Break" />
      </div>
      <div className="flex flex-col w-full justify-center items-center space-y-2">
        <Button
          onClick={() => {
            setWorkCount(0);
            setBreakCount(0);
          }}
          className="w-64 bg-app-background border-2 border-white/75">
          Reset
        </Button>
        <DrawerClose asChild>
          <Button
            /* TODO: show dialog box asking for confirmation
                 as saving will stop any timers running
        */
            onClick={() => setTime({ work: workCount, break: breakCount })}
            className="w-64 bg-slate-950">
            Save & Close
          </Button>
        </DrawerClose>
      </div>
    </DrawerContent>
  );
}

function Counter({
  count,
  setCount,
  subtitle,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  subtitle: string;
}) {
  return (
    <div className="mt-10 mb-14 min-w-40 flex flex-col text-white items-center">
      <div className="w-full flex justify-between items-center">
        <Button
          size="icon"
          className="rounded-full mt-2"
          variant={"ghost"}
          onClick={() => setCount((state) => state - 10)}>
          <MinusCircle strokeWidth={0.7} size={30} />
        </Button>
        <div
          className="flex font-semibold mx-2 justify-center items-center text-7xl"
          onWheel={(e) =>
            setCount((state) =>
              Math.min(
                999,
                Math.max(
                  0,
                  e.deltaY < 0 ? state + 1 : e.deltaY > 0 ? state - 1 : state
                )
              )
            )
          }>
          {count}
        </div>
        <Button
          size="icon"
          className="rounded-full mt-2"
          variant={"ghost"}
          onClick={() => setCount((state) => state + 10)}>
          <PlusCircle strokeWidth={0.7} size={30} />
        </Button>
      </div>
      <p className="font-extralight text-md">{subtitle}</p>
    </div>
  );
}

export default AppDrawerContent;
