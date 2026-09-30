const keyFor = (taskId) => `adulting101-task-${taskId}`

export const loadProgress = (taskId) => {
  try {
    return JSON.parse(localStorage.getItem(keyFor(taskId))) || []
  } catch {
    return []
  }
}

export const saveProgress = (taskId, doneSteps) => {
  try {
    localStorage.setItem(keyFor(taskId), JSON.stringify(doneSteps))
  } catch {}
}

export const isComplete = (task) => loadProgress(task.id).length >= task.steps.length

const LEVELS = [
  { min: 0, name: 'Baby Adult', icon: '🍼' },
  { min: 1, name: 'Apprentice Adult', icon: '🐣' },
  { min: 3, name: 'Functioning Adult', icon: '☕' },
  { min: 6, name: 'Seasoned Adult', icon: '🧾' },
  { min: 9, name: 'Almost Grown-Up', icon: '🏡' }
]

export const getLevel = (completed, total) => {
  if (total > 0 && completed >= total) return { name: 'Certified Grown-Up', icon: '🏆' }
  return [...LEVELS].reverse().find((level) => completed >= level.min)
}
