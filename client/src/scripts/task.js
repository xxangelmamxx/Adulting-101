import { fetchTaskById, fetchTasks } from '../services/tasksApi.js'
import { el, slugify, difficultyBadge, renderError } from './dom.js'
import { loadProgress, saveProgress } from './progress.js'

const container = document.querySelector('#task-detail')

const taskId = window.location.pathname.split('/').filter(Boolean).pop()

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const CONFETTI_COLORS = ['#7ee081', '#7cc4ff', '#ffb84d', '#ff8fab', '#ffe45c', '#b79cff', '#5ce1e6']

const celebrate = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const layer = el('div', { className: 'confetti', 'aria-hidden': 'true' })

  for (let i = 0; i < 80; i++) {
    layer.append(el('i', {
      style: [
        `left: ${Math.random() * 100}%`,
        `background: ${CONFETTI_COLORS[i % CONFETTI_COLORS.length]}`,
        `animation-delay: ${Math.random() * 0.4}s`,
        `animation-duration: ${1.6 + Math.random() * 1.4}s`,
        `--drift: ${(Math.random() - 0.5) * 200}px`,
        `--spin: ${Math.random() * 720}deg`
      ].join(';')
    }))
  }

  document.body.append(layer)
  setTimeout(() => layer.remove(), 3500)
}

const renderTaskNav = async (task) => {
  try {
    const tasks = await fetchTasks()
    const index = tasks.findIndex((t) => t.id === task.id)
    const prev = tasks[index - 1]
    const next = tasks[index + 1]

    const link = (t, label, className) =>
      t
        ? el('a', { href: `/tasks/${t.id}`, className: `task-nav-link ${className}`, dataset: { category: slugify(t.category) } },
            el('small', {}, label),
            el('span', {}, `${t.icon} ${t.title}`)
          )
        : el('span')

    return el('nav', { className: 'task-nav', 'aria-label': 'More tasks' },
      link(prev, '← Previous', 'prev'),
      link(next, 'Next up →', 'next')
    )
  } catch {
    return null
  }
}

const renderTask = async (task) => {
  document.title = `${task.title} · Adulting 101`

  const total = task.steps.length
  const saved = new Set(loadProgress(task.id))
  let doneCount = 0
  while (doneCount < total && saved.has(doneCount)) doneCount++

  const progressFill = el('span', { className: 'progress-fill' })
  const progressLabel = el('span', { className: 'progress-label' })
  const progressTrack = el('div', { className: 'progress-track', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(total), 'aria-label': 'Steps completed' }, progressFill)
  const hint = el('p', { className: 'step-hint', 'aria-live': 'polite' })

  const setDoneCount = (count) => {
    doneCount = count
    saveProgress(task.id, [...Array(doneCount).keys()])
    syncSteps()
  }

  const stepItems = task.steps.map((step, index) => {
    const checkbox = el('input', { type: 'checkbox', id: `step-${index}` })

    checkbox.addEventListener('change', () => {
      hint.textContent = ''
      if (checkbox.checked) {
        setDoneCount(index + 1)
        if (doneCount === total) celebrate()
      } else {
        setDoneCount(index)
      }
    })

    const item = el('li', { style: `--i: ${index}` },
      el('label', { for: `step-${index}` },
        checkbox,
        el('span', { className: 'step-number', 'aria-hidden': 'true' }, String(index + 1).padStart(2, '0')),
        el('span', { className: 'step-text' }, step)
      )
    )

    item.addEventListener('click', () => {
      if (!checkbox.disabled) return

      const message = index > doneCount
        ? `🔒 Finish step ${doneCount + 1} first. No skipping!`
        : `Untick step ${doneCount} first to go back.`
      hint.textContent = message

      item.classList.remove('shake')
      void item.offsetWidth
      item.classList.add('shake')
    })

    return item
  })

  function syncSteps() {
    stepItems.forEach((item, index) => {
      const checkbox = item.querySelector('input')
      const isDone = index < doneCount
      const isCurrent = index === doneCount
      const isLastDone = index === doneCount - 1

      checkbox.checked = isDone
      checkbox.disabled = !(isCurrent || isLastDone)
      item.classList.toggle('done', isDone)
      item.classList.toggle('current', isCurrent)
      item.classList.toggle('locked', index > doneCount)
    })

    progressFill.style.width = `${(doneCount / total) * 100}%`
    progressTrack.setAttribute('aria-valuenow', String(doneCount))
    progressLabel.textContent = doneCount === total ? '🎉 All done. Look at you, adulting!' : `${doneCount} / ${total} steps done`
  }

  const resetButton = el('button', { type: 'button', className: 'reset-btn' }, 'Reset progress')
  resetButton.addEventListener('click', () => {
    hint.textContent = ''
    setDoneCount(0)
  })

  syncSteps()

  container.removeAttribute('aria-busy')
  container.replaceChildren(
    el('article', { className: 'task-detail', dataset: { category: slugify(task.category) } },
      el('header', { className: 'detail-banner' },
        el('div', { className: 'detail-banner-text' },
          el('span', { className: 'category-tag' }, task.category),
          el('h1', {}, task.title),
          el('p', { className: 'lede' }, task.summary),
          el('div', { className: 'card-meta' },
            difficultyBadge(task.difficulty),
            el('span', { className: 'pill' }, `⏱ ${task.time_needed}`),
            el('span', { className: 'pill' }, `${total} steps`)
          )
        ),
        el('span', { className: 'task-icon large', 'aria-hidden': 'true' }, task.icon)
      ),

      el('section', { className: 'steps-section' },
        el('div', { className: 'progress-sticky' },
          el('div', { className: 'progress-row' },
            el('h2', {}, 'How to do it'),
            progressLabel
          ),
          progressTrack
        ),
        el('ol', { className: 'steps' }, stepItems),
        hint,
        resetButton
      ),

      el('aside', { className: 'pro-tip' },
        el('strong', {}, '💡 Pro tip'),
        el('p', {}, task.pro_tip)
      ),

      el('p', { className: 'submitted' },
        el('small', {}, `Submitted by ${task.submitted_by} · ${formatDate(task.submitted_on)}`)
      )
    )
  )

  const nav = await renderTaskNav(task)
  if (nav) container.append(nav)
}

const renderNotFound = () => {
  document.title = 'Task Not Found · Adulting 101'
  container.removeAttribute('aria-busy')
  container.replaceChildren(
    el('div', { className: 'empty-state' },
      el('p', { className: 'big-icon', 'aria-hidden': 'true' }, '🤷'),
      el('h2', {}, 'We could not find that task'),
      el('p', {}, 'It may have been removed, or the link is wrong.'),
      el('a', { href: '/', className: 'btn' }, 'Browse all tasks')
    )
  )
}

const init = async () => {
  try {
    const task = await fetchTaskById(taskId)
    if (task) await renderTask(task)
    else renderNotFound()
  } catch (error) {
    renderError(container, error.message)
  }
}

init()
