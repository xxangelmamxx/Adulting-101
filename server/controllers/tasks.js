import { pool } from '../config/database.js'

const getTasks = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM tasks ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getTaskById = async (req, res) => {
  const taskId = Number(req.params.taskId)

  if (!Number.isInteger(taskId)) {
    return res.status(404).json({ error: 'Task not found' })
  }

  try {
    const results = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getTasks,
  getTaskById
}
