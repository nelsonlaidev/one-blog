import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['./src/components/ui/*.tsx'],
  ignoreDependencies: ['postcss'],
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)(?:import|plugin)[^;]+/g)].join('\n').replace('plugin', 'import')
  }
}

export default config
