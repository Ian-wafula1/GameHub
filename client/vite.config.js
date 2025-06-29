import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
// export default defineConfig({
// 	plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:8000/',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   }
// });
export default defineConfig({
	base: './',
	plugins: [react()],
	build: {
		// assetsDir: 'static',
		outDir: path.resolve(__dirname, '../server/static'),
		emptyOutDir: true,
	},
	server: {
		port: 3000,
		cors: true,
	},
});
