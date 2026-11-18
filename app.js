const dialog = document.querySelector('#reflection');
const opener = document.querySelector('#open-reflection');
const form = document.querySelector('#reflection-form');
const result = document.querySelector('#reflection-result');
const steps = {
  direction: {
    title: 'Make space for what matters.',
    description: 'Take ten minutes to write down three things you want more of in your next chapter. Circle one, then choose a small action you can take toward it this week.'
  },
  connection: {
    title: 'Start with a conversation.',
    description: 'Think of someone you trust. Reach out and share one thing you’re working toward. Ask for a conversation, not a solution — connection is a first step in itself.'
  },
  skill: {
    title: 'Follow a little curiosity.',
    description: 'Choose one skill you’d like to explore. Find a beginner-friendly resource and set aside fifteen minutes today. You don’t have to master it; just begin.'
  }
};

opener.addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  result.hidden = true;
  result.replaceChildren();
  dialog.showModal();
});

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => opener.focus({ preventScroll: true }));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = new FormData(form).get('direction');
  const step = steps[selected];
  if (!step) return;
  const title = document.createElement('h3');
  title.textContent = step.title;
  const description = document.createElement('p');
  description.textContent = step.description;
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'button';
  reset.textContent = 'Explore another first step ↻';
  reset.addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    form.querySelector('input:checked').focus();
  });
  result.replaceChildren(title, description, reset);
  form.hidden = true;
  result.hidden = false;
  reset.focus();
});
