import { pool } from './database.js'
import './dotenv.js'
import taskData from '../data/tasks.js'

const createTasksTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS tasks;

    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      difficulty VARCHAR(10) NOT NULL,
      time_needed VARCHAR(20) NOT NULL,
      icon VARCHAR(10) NOT NULL,
      summary TEXT NOT NULL,
      steps TEXT[] NOT NULL,
      pro_tip TEXT NOT NULL,
      submitted_by VARCHAR(255) NOT NULL,
      submitted_on TIMESTAMP NOT NULL
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 tasks table created successfully')
  } catch (err) {
    console.error('⚠️ error creating tasks table', err)
  }
}

const seedTasksTable = async () => {
  await createTasksTable()

  for (const task of taskData) {
    const insertQuery = {
      text: 'INSERT INTO tasks (title, category, difficulty, time_needed, icon, summary, steps, pro_tip, submitted_by, submitted_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
    }

    const values = [
      task.title,
      task.category,
      task.difficulty,
      task.timeNeeded,
      task.icon,
      task.summary,
      task.steps,
      task.proTip,
      task.submittedBy,
      task.submittedOn
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`✅ ${task.title} added successfully`)
    } catch (err) {
      console.error('⚠️ error inserting task', err)
    }
  }

  await pool.end()
}

seedTasksTable()
