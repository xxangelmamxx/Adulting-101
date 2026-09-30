export const fetchTasks = async () => {
  const response = await fetch('/api/tasks')

  if (!response.ok) {
    throw new Error(`Could not load tasks (status ${response.status})`)
  }

  return response.json()
}

export const fetchTaskById = async (id) => {
  const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Could not load task (status ${response.status})`)
  }

  return response.json()
}
