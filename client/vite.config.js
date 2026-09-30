import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const page = (file) => fileURLToPath(new URL(file, import.meta.url))

export default defineConfig({
  build: {
    outDir: '../server/public',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: page('./index.html'),
        task: page('./task.html'),
        notFound: page('./404.html')
      }
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  plugins: [
    {
      name: 'task-detail-route',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (/^\/tasks\/[^/?]+\/?(\?.*)?$/.test(req.url)) {
            req.url = '/task.html'
          }
          next()
        })
      }
    }
  ]
})
