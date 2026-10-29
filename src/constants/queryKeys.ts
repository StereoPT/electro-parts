const COMPONENTS = "components";
const CATEGORIES = "categories";
const ADJUSTMENTS = "adjustments";

export const KEYS = {
  components: [COMPONENTS],
  component: (componentId: string) => [COMPONENTS, componentId],

  categories: [CATEGORIES],
  category: (categoryId: string) => [CATEGORIES, categoryId],

  adjustments: [ADJUSTMENTS],
} as const;
