import { format, parse } from "date-fns";

// Calendar days are stored and passed around as YYYY-MM-DD and shown as DD-MM-YYYY.
export const VALUE_FORMAT = "yyyy-MM-dd";
export const DISPLAY_FORMAT = "dd-MM-yyyy";

export const today = () => format(new Date(), VALUE_FORMAT);

export const formatDay = (value: string) =>
  format(parse(value, VALUE_FORMAT, new Date()), DISPLAY_FORMAT);
