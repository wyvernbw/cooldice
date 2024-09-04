"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export const Counter = () => {
  
  const [count, setCount] = useState(0);
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setCount((prev) => prev + 1)}
    >
      {count}
    </Button>
  );
};
