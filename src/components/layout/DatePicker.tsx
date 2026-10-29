"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const VALUE_FORMAT = "yyyy-MM-dd";
const DISPLAY_FORMAT = "dd-MM-yyyy";

type DatePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  maxDate?: Date;
  invalid?: boolean;
};

export const DatePicker = ({
  id,
  value,
  onChange,
  onBlur,
  maxDate,
  invalid,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const parsed = parse(value, VALUE_FORMAT, new Date());
  const selected = isValid(parsed) ? parsed : undefined;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            aria-invalid={invalid}
            className="w-full justify-start font-normal"
            id={id}
            onBlur={onBlur}
            variant="outline"
          />
        }
      >
        <CalendarIcon />
        {selected ? (
          format(selected, DISPLAY_FORMAT)
        ) : (
          <span className="text-muted-foreground">Pick a date</span>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          autoFocus
          defaultMonth={selected}
          disabled={maxDate ? { after: maxDate } : undefined}
          mode="single"
          onSelect={(date) => {
            if (date) {
              onChange(format(date, VALUE_FORMAT));
              setOpen(false);
            }
          }}
          selected={selected}
        />
      </PopoverContent>
    </Popover>
  );
};
