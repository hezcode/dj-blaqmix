import { NextRequest } from "next/server";

const requestWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestMap = new Map<string, number[]>();

export const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
};

export const isRateLimited = (key: string) => {
  const now = Date.now();
  const previous = requestMap.get(key) || [];
  const withinWindow = previous.filter((ts) => now - ts < requestWindowMs);

  if (withinWindow.length >= maxRequestsPerWindow) {
    requestMap.set(key, withinWindow);
    return true;
  }

  requestMap.set(key, [...withinWindow, now]);
  return false;
};

export const isSubmissionTooFast = (startedAt: number | null, minDelayMs: number) => {
  if (!startedAt || Number.isNaN(startedAt)) return false;
  return Date.now() - startedAt < minDelayMs;
};
