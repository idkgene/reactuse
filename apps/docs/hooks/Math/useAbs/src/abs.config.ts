export const defineConfig = () => {
  const CORE_OPS = [
    'COMPUTE',        // Basic calculation of the absolute value
    'VALIDATE',       // Input validation
  ] as const;

  const ADDONS = [] as const;

  return {
    operations: {
      core: CORE_OPS,
      addons: ADDONS,
    },
    defaults: {
      operations: {
        core: CORE_OPS,
        addons: [] as (typeof ADDONS)[number][],
      },
      options: {},
    },
    type: {} as {
      Config: {
        readonly operations: {
          readonly core: readonly (typeof CORE_OPS)[number][];
          readonly addons: readonly (typeof ADDONS)[number][];
        };
      };
    },
  };
};

export type AbsConfig = ReturnType<typeof defineConfig>;
