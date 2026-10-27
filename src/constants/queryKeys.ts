const COMPONENTS = "components";

export const KEYS = {
  components: [COMPONENTS],
  component: (componentId: string) => [COMPONENTS, componentId],
} as const;
