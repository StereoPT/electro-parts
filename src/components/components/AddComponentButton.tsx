"use client";

import { useState } from "react";
import { ComponentDialog } from "@/components/components/ComponentDialog";
import { Button } from "@/components/ui/button";

// Button plus its own Add dialog; used in the page header and the empty state.
export const AddComponentButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} type="button">
        Add component
      </Button>
      <ComponentDialog onOpenChange={setOpen} open={open} />
    </>
  );
};
