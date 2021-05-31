import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    envCompatible({
      prefix: 'REACT_APP',
      mountedPath: 'process.env',
    }),
  ],
});
