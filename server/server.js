import express from 'express'
import './config/dotenv.js'
import path from 'path'
import { fileURLToPath } from 'url'
import tasksRouter from './routes/tasks.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, 'public')

const app = express()

app.use(express.static(publicDir))

app.use('/api/tasks', tasksRouter)

app.get('/tasks/:taskId', (req, res) => {
  res.sendFile(path.resolve(publicDir, 'task.html'))
})

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(publicDir, '404.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
