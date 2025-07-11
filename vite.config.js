import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/https://github.com/BestBuyMetalsDev01/PoleBarnForm.git/', // IMPORTANT: Replace 'your-repo-name' with your actual GitHub repository name

})
