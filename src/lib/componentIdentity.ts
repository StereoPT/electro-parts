// A Component is identified by its name and Manufacturer, compared
// case-insensitively after trimming. "No Manufacturer" is its own value ("").
export const toIdentityKeys = (
  name: string,
  manufacturer: string | null | undefined,
) => ({
  manufacturerKey: (manufacturer ?? "").trim().toLowerCase(),
  nameKey: name.trim().toLowerCase(),
});
