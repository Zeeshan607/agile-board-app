import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port:parseInt(process.env.VITE_PORT) || 4173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000/api',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//         // rewrite: (path) => path.replace(/^\/api/, '/api'),
//       },
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             // Split each dependency into its own chunk
//             return id.split('node_modules/')[1].split('/')[0];
//           }
//           if (id.includes('froala-editor')) {
//             return 'froala-editor';
//           }
//         },
//       },
//     },
//   },
// })


export default defineConfig(({ command }) => {
  if (command === 'serve' || command === 'preview' || command === 'dev' ) {
   // development config
    return {
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000/api',
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      build: {
            rollupOptions: {
              output: {
                manualChunks(id) {
                  if (id.includes('node_modules')) {
                    // Split each dependency into its own chunk
                    return id.split('node_modules/')[1].split('/')[0];
                  }
                  if (id.includes('froala-editor')) {
                    return 'froala-editor';
                  }
                },
              },
            },
          },
    };


  } else {


       // Production config
    return {
 
      plugins: [react()],
      build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  // Split each dependency into its own chunk
                  return id.split('node_modules/')[1].split('/')[0];
                }
                if (id.includes('froala-editor')) {
                  return 'froala-editor';
                }
              },
            },
          },
        },
    };
  }
});
