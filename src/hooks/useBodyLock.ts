"use client";

import { useCallback, useEffect, useState } from "react";

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [locked]);
}

export function useLockBodyScroll(active: boolean) {
  useBodyLock(active);
  return active;
}