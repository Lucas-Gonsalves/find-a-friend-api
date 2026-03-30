import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    dir: 'src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
        },
      },
    ],
  },
})
