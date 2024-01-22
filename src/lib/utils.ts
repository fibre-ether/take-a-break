import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notify = async (title: string, body: string) => {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }
  if (permissionGranted) {
    sendNotification({ title, body });
  }
};

export enum timeUnit {
  second,
  minute,
  hour,
}

// https://stackoverflow.com/a/11486026
export const prettyPrintTime = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  let ret = [];
  ret.push(hrs < 10 ? "0" + hrs : hrs);
  ret.push(mins < 10 ? "0" + mins : mins);
  ret.push(secs < 10 ? "0" + secs : secs);

  return ret.join("\u200a:\u200a");
};
