import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidJSON(str: string): boolean {
  if (typeof str !== "string") return false

  try {
    const result = JSON.parse(str)
    // 额外判断 JSON 必须是对象或数组（可选）
    return typeof result === "object" && result !== null
  } catch (e) {
    console.log(e)
    return false
  }
}
