import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import htmlEnvPlugin from 'vite-plugin-html-env';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
    build: { outDir: 'build' },
    plugins: [reactRefresh(), htmlEnvPlugin(), checker({ typescript: true, eslint: { lintCommand: 'eslint --ext ts,tsx ./' }, overlay: false })],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    }
});
