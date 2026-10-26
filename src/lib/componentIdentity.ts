// A Component is identified by its name and Manufacturer, compared
// case-insensitively after trimming. "No Manufacturer" is its own value ("").
export const toComponentIdentityKeys = (
  name: string,
  manufacturer: string | null | undefined,
) => ({
  manufacturerKey: (manufacturer ?? "").trim().toLowerCase(),
  nameKey: name.trim().toLowerCase(),
});

export const formatComponentLabel = (component: {
  manufacturer: string | null;
  name: string;
}) =>
  component.manufacturer
    ? `${component.name} (${component.manufacturer})`
    : component.name;
