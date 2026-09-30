export const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag)

  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null || value === false) continue

    if (key === 'className') node.className = value
    else if (key === 'dataset') Object.assign(node.dataset, value)
    else if (key === 'style') node.style.cssText = value
    else node.setAttribute(key, value === true ? '' : value)
  }

  node.append(...children.flat().filter((child) => child !== null && child !== undefined))

  return node
}

export const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const difficultyBadge = (difficulty) => {
  const level = { Easy: 1, Medium: 2, Hard: 3 }[difficulty] || 1

  return el('span', { className: `pill difficulty difficulty-${difficulty.toLowerCase()}`, title: `Difficulty: ${difficulty}` },
    el('span', { className: 'dots', 'aria-hidden': 'true' },
      [1, 2, 3].map((n) => el('i', { className: n <= level ? 'on' : '' }))
    ),
    difficulty
  )
}

export const renderError = (container, message) => {
  container.removeAttribute('aria-busy')
  container.replaceChildren(
    el('div', { className: 'empty-state' },
      el('p', { className: 'big-icon', 'aria-hidden': 'true' }, '🔌'),
      el('h3', {}, 'Something went wrong'),
      el('p', {}, message),
      el('p', {}, el('small', {}, 'Make sure the server is running and connected to the database.'))
    )
  )
}
