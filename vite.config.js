import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Linker/', // Add this line

  plugins: [react(), pluginRewriteAll({
    rewriteAll:truegit 
  })]
})
