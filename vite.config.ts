import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import htmlEnvPlugin from 'vite-plugin-html-env';
import path from 'path';

export default defineConfig({
    build: { outDir: 'build' },
    plugins: [reactRefresh(), htmlEnvPlugin()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    }
});
