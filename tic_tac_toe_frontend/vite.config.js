/* eslint-disable */
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import blitsVitePlugins from '@lightningjs/blits/vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: '/', // Set to your base path if you are deploying to a subdirectory (example: /myApp/)
    plugins: [...blitsVitePlugins],
    resolve: {
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.kavia.ai'],
      port: 3000,
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      fs: {
        allow: ['..'],
      },
    },
    worker: {
      format: 'es',
    },
  }
})