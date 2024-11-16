/** Available core operations for absolute value calculations */
enum CoreOperations {
  COMPUTE = 'COMPUTE',      // Basic calculation of the absolute value
  VALIDATE = 'VALIDATE',    // Input validation
}

/** Configuration for operations */
interface OperationsConfig {
  readonly core: readonly CoreOperations[];
  readonly addons: readonly string[];
}

/** Options for absolute value calculations */
interface AbsOptions {}

/** Configuration type */
interface AbsConfigType {
  operations: OperationsConfig;
  defaults: {
    operations: OperationsConfig;
    options: AbsOptions;
  };
}

/**
 * Defines configuration for absolute value operations
 * @returns Configuration object with core operations and addons
 */
export const defineConfig = () => {
  const CORE_OPS = [CoreOperations.COMPUTE, CoreOperations.VALIDATE] as const;

  const ADDONS = [] as const;

  return {
    operations: {
      core: CORE_OPS,
      addons: ADDONS,
    },
    defaults: {
      operations: {
        core: CORE_OPS,
        addons: [],
      },
      options: {} as AbsOptions,
    },
    type: {} as { Config: AbsConfigType },
  };
};

export type AbsConfig = ReturnType<typeof defineConfig>;
