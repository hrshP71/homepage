let selectedWebsite = 'https://www.google.com/search?q=';

const navigate = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const query = document.getElementById('_search___bar').value.toString();
  if (query) {
    window.location = selectedWebsite + query.trim();
  }
}

window.addEventListener('load', () => {
  document.querySelector('._search-bar-wrapper').classList.add('active');
});

const border = () => {
  document.querySelector('._search-bar ._input-wrapper').classList.add('active');
}

const noBorder = () => {
  document.querySelector('._search-bar ._input-wrapper').classList.remove('active');
}

const buttonFunc = (e) => {
  e.stopPropagation();
  console.log(e.target.dataset);
  document.querySelectorAll('._dropdown.active ._flat-button').forEach(button => button.classList.remove('_is-visible'));
  document.querySelector(`._dropdown ._flat-button[data-area=${e.target.dataset.area}]`).classList.add('_is-visible');
  document.querySelector('._search-bar ._input-wrapper input').placeholder = `Search on ${e.target.dataset.area}`;
  selectedWebsite = e.target.dataset.query;
  document.querySelector('._dropdown').classList.remove('active');
  document.querySelectorAll('._dropdown ._flat-button').forEach(button => button.removeEventListener('click', buttonFunc));
}

document.querySelector('._dropdown').addEventListener('click', () => {
  document.querySelector('._dropdown').classList.add('active');
  document.querySelectorAll('._dropdown.active ._flat-button').forEach(button => button.classList.add('_is-visible'));
  document.querySelectorAll('._dropdown.active ._flat-button').forEach(button => button.addEventListener('click', buttonFunc));
});

const openTodo = () => {
  let isActive = document.getElementById('_todo-section').className.includes('active');
  isActive ? document.getElementById('_todo-section').classList.remove('active') : document.getElementById('_todo-section').classList.add('active');
}

document.getElementById('_todo-section').querySelectorAll('.__section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));

const autoSave = (e) => {
  console.log(e);
  e.target.parentNode.querySelector('.__auto-save').classList.add('active');
  setTimeout(() => {
    alert('Autosaved Successfully');
    e.target.parentNode.querySelector('.__auto-save').classList.remove('active');
  }, 5000);
}