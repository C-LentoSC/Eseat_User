"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function RetryButton({ link }: any) {
  return (
    <Button
      className="text-[15px]"
      onClick={() => {
        window.location.replace(link);
      }}
    >
      Try Again
    </Button>
  );
}