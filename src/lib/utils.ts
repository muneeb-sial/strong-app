import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const convertEnumToLabel = (enumValue: string) => {
    return enumValue.replace("_", " ");
}

export function normalizeBodyPart(value: string): string {
  // split by underscore if present
  const parts = value.split("_");

  return parts
    .map((part) => {
      const lower = part.toLowerCase();

      // handle single token like "ARMS"
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

export const isNumeric = (value: unknown): boolean => {
  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (typeof value === "string" && value.trim() !== "") {
    return Number.isFinite(Number(value));
  }

  return false;
};