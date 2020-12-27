let selectedWebsite = 'https://www.google.com/search?q=';

window.addEventListener('load', () => {
  const items = { ...localStorage };
  Object.entries(items).forEach(item => {
    const [key, value] = item;
    if (key.includes('todos')) {
      addTodo(null, JSON.parse(value).title, JSON.parse(value).description, key.toString().replace('todos', ''));
    }
  })
});

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

let isTyping = false;
let title = '';
let description = '';

const typing = (e, t) => {
  if (e.target.nodeName === "TEXTAREA") {
    title = e.target.previousElementSibling.value;
    description = e.target.value;
  } else {
    title = e.target.value
    description = e.target.nextElementSibling.value;
  };

  isTyping = true;
  if (!t) {
    e.target.parentNode.querySelector('.__auto-save').classList.remove('active');
    window.clearTimeout(timeout);
  }
};

let timeout;
const Wilmut = document.querySelector('.__section-item[data-index="0"]');
document.getElementById('_todo-section').querySelectorAll('.__section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));

const autoSave = (e) => {
  isTyping = false;
  e.target.parentNode.querySelector('.__auto-save').classList.add('active');
  const index = e.target.parentNode.dataset.index;
  if (!isTyping) {
    timeout = window.setTimeout(() => {
      localStorage.setItem(`todos${index}`, JSON.stringify({ title: title, description: description }));
      e.target.parentNode.querySelector('.__auto-save').classList.remove('active');
    }, 5000);
  }
  else {
    window.clearTimeout(timeout);
  }
}
const addTodo = (e, title, description, index) => {
  const Dolly = Wilmut.cloneNode(true);
  Dolly.classList.remove('active');
  let howManyChilds = 0;
  let newClone = document.createElement('div');
  if (title || description) {
    Dolly.querySelector('input').value = title;
    Dolly.querySelector('textarea').value = description;
  }
  if (e) {
    howManyChilds = e.target.parentNode.querySelectorAll('.__section-item').length - 1;
    Dolly.setAttribute('data-index', howManyChilds + 1);
    e.target.parentNode.insertBefore(Dolly, e.target)
    newClone = document.querySelector(`.__section-item[data-index="${howManyChilds + 1}`);
  }
  else {
    const button = document.querySelector('.__add-todo');
    let defaultEl = document.querySelector('[default]');
    defaultEl ? defaultEl.remove() : null;
    Dolly.setAttribute('data-index', index);
    Dolly.removeAttribute('default');
    button.parentNode.insertBefore(Dolly, button);
    newClone = document.querySelector(`.__section-item[data-index="${index}`);
  }
  setTimeout(() => {
    newClone.classList.add('active');
  }, 100);
  document.getElementById('_todo-section').querySelectorAll('.__section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));
}

const openTodo = () => {
  let isActive = document.getElementById('_todo-section').className.includes('active');
  isActive ? document.getElementById('_todo-section').classList.remove('active') : document.getElementById('_todo-section').classList.add('active');
}

const addCopyPaste = () => { };

document.getElementById('_copy-paste-section').querySelectorAll('.__section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));

const openCopyPaste = () => {
  let isActive = document.getElementById('_copy-paste-section').className.includes('active');
  isActive ? document.getElementById('_copy-paste-section').classList.remove('active') : document.getElementById('_copy-paste-section').classList.add('active');
}
let indexNo = 0;

const openModal = (e) => {
  indexNo = e.target.parentNode.parentNode.dataset.index;
  document.getElementById('modal').classList.add('active');
}
const closeModal = () => {
  document.getElementById('modal').classList.remove('active');
}
const registerVariable = () => {
  document.getElementById('modal').classList.remove('active');
  let variableInput = document.getElementById('modalInput').value;
  variableInput = `#{${variableInput.trim()}}`;
  document.querySelector(`#_copy-paste-section .__section-item[data-index="${indexNo}"] textarea`).value += variableInput;
}