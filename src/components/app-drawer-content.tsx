import { MinusCircle, PlusCircle } from "lucide-react";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

function AppDrawerContent() {
  const [workCount, setWorkCount] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
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
        <Button className="w-64 bg-app-background border-2 border-white/75">
          Reset
        </Button>
        <Button className="w-64 bg-slate-950">Save</Button>
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
    <div className="h-40 min-w-40 flex flex-col text-white items-center">
      <div className="w-full flex justify-between items-center">
        <Button
          size="icon"
          className="rounded-full"
          variant={"ghost"}
          onClick={() => setCount((state) => state + 10)}>
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
          className="rounded-full"
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
