// Small interactions: a mobile menu, reading progress, and the class comparison.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navLinks.classList.toggle('open', open);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const perspectives = {
  elite: {
    number: '01', title: 'THE ELITE',
    description: 'Gatsby enters a world of enormous wealth, but wealth does not erase social boundaries. Fitzgerald shows that the Dream can offer access without guaranteeing belonging.',
    connection: 'Connection: Daisy and Tom’s inherited privilege protects their place in society.'
  },
  middle: {
    number: '02', title: 'THE COMFORTABLE',
    description: 'In Fahrenheit 451, familiar routines and constant entertainment make it easier to avoid difficult questions. Comfort can feel like freedom even when choices narrow.',
    connection: 'Connection: Montag begins inside the system before he recognizes what it costs him.'
  },
  outsider: {
    number: '03', title: 'THE OUTSIDER',
    description: 'People outside the center can see its limits more clearly. Gatsby tries to enter Daisy’s world; Montag steps away from his. Both reveal the cost of belonging.',
    connection: 'Connection: The novels ask whether real change means entering the system or questioning it.'
  }
};
const cards = document.querySelectorAll('.class-card');
cards.forEach(card => card.addEventListener('click', () => {
  cards.forEach(item => {
    const active = item === card;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  const entry = perspectives[card.dataset.level];
  document.getElementById('class-number').textContent = entry.number;
  document.getElementById('class-display-title').textContent = entry.title;
  document.getElementById('class-description').textContent = entry.description;
  document.getElementById('class-connection').textContent = entry.connection;
}));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll('a').forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
