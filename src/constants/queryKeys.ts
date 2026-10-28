const COMPONENTS = "components";
const CATEGORIES = "categories";

export const KEYS = {
  components: [COMPONENTS],
  component: (componentId: string) => [COMPONENTS, componentId],

  categories: [CATEGORIES],
} as const;
