import { fetchTasks } from '../services/tasksApi.js'
import { el, slugify, difficultyBadge, renderError } from './dom.js'
import { loadProgress, isComplete, getLevel } from './progress.js'

const grid = document.querySelector('#task-grid')
const searchInput = document.querySelector('#search')
const chipGroup = document.querySelector('#category-chips')
const difficultySelect = document.querySelector('#difficulty')
const resultCount = document.querySelector('#result-count')
const heroStats = document.querySelector('#hero-stats')
const levelCard = document.querySelector('#level-card')

let allTasks = []
const filters = { query: '', category: '', difficulty: '' }

const renderCard = (task, index) => {
  const doneCount = Math.min(loadProgress(task.id).length, task.steps.length)
  const percent = Math.round((doneCount / task.steps.length) * 100)

  let status = null
  if (doneCount === task.steps.length) status = el('span', { className: 'status done' }, '✓ Done')
  else if (doneCount > 0) status = el('span', { className: 'status started' }, `${percent}%`)

  return el('a', {
    className: 'task-card',
    href: `/tasks/${task.id}`,
    style: `--i: ${index}`,
    dataset: { category: slugify(task.category) },
    'aria-label': `${task.title}. ${task.category}, ${task.difficulty}, about ${task.time_needed}.`
  },
    el('div', { className: 'card-banner' },
      el('span', { className: 'category-tag' }, task.category),
      status,
      el('span', { className: 'task-icon', 'aria-hidden': 'true' }, task.icon)
    ),
    el('div', { className: 'card-body' },
      el('h3', {}, task.title),
      el('p', { className: 'summary' }, task.summary),
      el('div', { className: 'card-meta' },
        difficultyBadge(task.difficulty),
        el('span', { className: 'pill' }, `⏱ ${task.time_needed}`),
        el('span', { className: 'pill' }, `${task.steps.length} steps`)
      )
    ),
    el('div', { className: 'card-footer' },
      el('span', { className: 'card-cta' }, doneCount > 0 && doneCount < task.steps.length ? 'Keep going' : 'Show me how'),
      el('span', { className: 'arrow', 'aria-hidden': 'true' }, '→')
    ),
    doneCount > 0 ? el('span', { className: 'card-progress', style: `--p: ${percent}%`, 'aria-hidden': 'true' }) : null
  )
}

const matchesFilters = (task) => {
  const query = filters.query.trim().toLowerCase()
  const searchable = [task.title, task.summary, task.category, ...task.steps].join(' ').toLowerCase()

  return (
    (!query || searchable.includes(query)) &&
    (!filters.category || task.category === filters.category) &&
    (!filters.difficulty || task.difficulty === filters.difficulty)
  )
}

const renderTasks = () => {
  const visible = allTasks.filter(matchesFilters)

  resultCount.textContent = `${visible.length} of ${allTasks.length} tasks`

  if (visible.length === 0) {
    grid.replaceChildren(
      el('div', { className: 'empty-state' },
        el('p', { className: 'big-icon', 'aria-hidden': 'true' }, '🫠'),
        el('h3', {}, 'Nothing matches that'),
        el('p', {}, 'Try a different word or clear your filters.')
      )
    )
    return
  }

  grid.replaceChildren(...visible.map(renderCard))
}

const renderChips = () => {
  const categories = [...new Set(allTasks.map((task) => task.category))].sort()

  const chips = ['', ...categories].map((category) => {
    const count = category ? allTasks.filter((task) => task.category === category).length : allTasks.length

    return el('button', {
      type: 'button',
      className: 'chip',
      'aria-pressed': String(filters.category === category),
      dataset: { value: category, category: category ? slugify(category) : 'all' }
    }, category || 'All', el('span', { className: 'chip-count' }, String(count)))
  })

  chipGroup.replaceChildren(...chips)
}

const renderHero = () => {
  const categoryCount = new Set(allTasks.map((task) => task.category)).size
  const stepCount = allTasks.reduce((sum, task) => sum + task.steps.length, 0)

  heroStats.replaceChildren(
    ...[
      [allTasks.length, 'life skills'],
      [categoryCount, 'categories'],
      [stepCount, 'tiny steps']
    ].map(([value, label]) => el('div', { className: 'stat' }, el('strong', {}, String(value)), el('span', {}, label)))
  )

  const completed = allTasks.filter(isComplete).length
  const level = getLevel(completed, allTasks.length)
  const percent = allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0

  levelCard.replaceChildren(
    el('p', { className: 'level-label' }, 'Your adulting level'),
    el('p', { className: 'level-icon', 'aria-hidden': 'true' }, level.icon),
    el('p', { className: 'level-name' }, level.name),
    el('div', { className: 'level-bar', style: `--p: ${percent}%`, role: 'progressbar', 'aria-valuenow': String(completed), 'aria-valuemin': '0', 'aria-valuemax': String(allTasks.length), 'aria-label': 'Tasks completed' }),
    el('p', { className: 'level-sub' }, `${completed} of ${allTasks.length} tasks completed`)
  )
}

chipGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.chip')
  if (!chip) return

  filters.category = chip.dataset.value
  chipGroup.querySelectorAll('.chip').forEach((c) => {
    c.setAttribute('aria-pressed', String(c === chip))
  })
  renderTasks()
})

searchInput.addEventListener('input', (event) => {
  filters.query = event.target.value
  renderTasks()
})

difficultySelect.addEventListener('change', (event) => {
  filters.difficulty = event.target.value
  renderTasks()
})

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput) {
    event.preventDefault()
    searchInput.focus()
  }
})

const init = async () => {
  try {
    allTasks = await fetchTasks()
    grid.removeAttribute('aria-busy')
    renderHero()
    renderChips()
    renderTasks()
  } catch (error) {
    renderError(grid, error.message)
  }
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted && allTasks.length) {
    renderHero()
    renderTasks()
  }
})

init()
