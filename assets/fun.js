let selectedWebsite = 'https://www.google.com/search?q=';
let modalState = '';
let copyPasteItem = '';
let isTyping = false;
let title = '';
let description = '';
let indexNo = 0;
let timeout;
const Wilmut = document.querySelector('#todo-section ._section-item[data-index="0"]');
const Ian = document.querySelector('#copy-paste-section ._section-item[data-index="0"]');
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
  const query = document.getElementById('____search-input').value.toString();
  if (query) {
    window.location = selectedWebsite + query.trim();
  }
}

window.addEventListener('load', () => {
  document.querySelector('._search-bar-wrapper').classList.add('_is-active');
});

const border = () => {
  document.querySelector('.__search-bar .___input-wrapper').classList.add('___is_active');
}

const noBorder = () => {
  document.querySelector('.__search-bar .___input-wrapper').classList.remove('___is_active');
}

const buttonFunc = (e) => {
  e.stopPropagation();
  document.querySelectorAll('.__dropdown.__is-active .g_flat-button').forEach(button => button.classList.remove('g_is-visible'));
  document.querySelector(`.__dropdown .g_flat-button[data-area=${e.target.dataset.area}]`).classList.add('g_is-visible');
  document.querySelector('.__search-bar .___input-wrapper input').placeholder = `Search on ${e.target.dataset.area}`;
  selectedWebsite = e.target.dataset.query;
  document.querySelector('.__dropdown').classList.remove('__is-active');
  document.querySelectorAll('.__dropdown .g_flat-button').forEach(button => button.removeEventListener('click', buttonFunc));
}

document.querySelector('.__dropdown').addEventListener('click', () => {
  document.querySelector('.__dropdown').classList.add('__is-active');
  document.querySelectorAll('.__dropdown.__is-active .g_flat-button').forEach(button => button.classList.add('g_is-visible'));
  document.querySelectorAll('.__dropdown.__is-active .g_flat-button').forEach(button => button.addEventListener('click', buttonFunc));
});

const typing = (e, t) => {
  if (e.target.nodeName === "TEXTAREA") {
    title = e.target.previousElementSibling.value || '';
    description = e.target.value;
  } else {
    title = e.target.value
    description = e.target.nextElementSibling.value || '';
  };

  isTyping = true;
  if (!t) {
    e.target.parentNode.querySelector('.__auto-save').classList.remove('__is-active');
    window.clearTimeout(timeout);
  }
};

document.getElementById('todo-section').querySelectorAll('._section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));

const autoSave = (e) => {
  isTyping = false;
  e.target.parentNode.querySelector('.__auto-save').classList.add('__is-active');
  const index = e.target.parentNode.dataset.index;
  if (!isTyping) {
    timeout = window.setTimeout(() => {
      localStorage.setItem(`todos${index}`, JSON.stringify({ title: title, description: description }));
      e.target.parentNode.querySelector('.__auto-save').classList.remove('__is-active');
    }, 5000);
  }
  else {
    window.clearTimeout(timeout);
  }
}
const addTodo = (e, title, description, index) => {
  const Dolly = Wilmut.cloneNode(true);
  Dolly.classList.remove('_is-active');
  let howManyChilds = 0;
  let newClone = document.createElement('div');
  if (title || description) {
    Dolly.querySelector('input').value = title;
    Dolly.querySelector('textarea').value = description;
  }
  if (e) {
    howManyChilds = e.target.parentNode.querySelectorAll('._section-item').length - 1;
    Dolly.setAttribute('data-index', howManyChilds + 1);
    e.target.parentNode.insertBefore(Dolly, e.target)
    newClone = document.querySelector(`._section-item[data-index="${howManyChilds + 1}`);
  }
  else {
    const button = document.querySelector('._add-todo');
    let defaultEl = document.querySelector('[default]');
    defaultEl ? defaultEl.remove() : null;
    Dolly.setAttribute('data-index', index);
    Dolly.removeAttribute('default');
    button.parentNode.insertBefore(Dolly, button);
    newClone = document.querySelector(`._section-item[data-index="${index}`);
  }
  setTimeout(() => {
    newClone.classList.add('_is-active');
  }, 100);
  document.getElementById('todo-section').querySelectorAll('._section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));
}

const openTodo = () => {
  let isActive = document.getElementById('todo-section').className.includes('is-active');
  isActive ? document.getElementById('todo-section').classList.remove('is-active') : document.getElementById('todo-section').classList.add('is-active');
}

const addCopyPaste = () => { };

document.getElementById('copy-paste-section').querySelectorAll('._section-item').forEach(section => section.addEventListener('click', (e) => { e.target.childNodes.disabled = false; e.target.disabled = false; }));

const openCopyPaste = () => {
  let isActive = document.getElementById('copy-paste-section').className.includes('is-active');
  isActive ? document.getElementById('copy-paste-section').classList.remove('is-active') : document.getElementById('copy-paste-section').classList.add('is-active');
}

const cleanModal = () => {
  [...document.querySelector('#modal ._modal-content').childNodes].forEach(el => { if (el.nodeName !== 'DIV') { el.remove() } });
};

const openModal = (e) => {
  indexNo = e.target.parentNode.parentNode.dataset.index;
  document.getElementById('modal').classList.add('is-active');
  cleanModal();
  const label = document.createElement('label');
  label.setAttribute('for', 'variable');
  label.innerText = 'Enter a variable';
  const input = document.createElement('input');
  input.setAttribute('id', 'modalInput');
  document.querySelector('#modal ._modal-content').appendChild(label);
  document.querySelector('#modal ._modal-content').appendChild(input);
  modalState = 'input';
}

const populateModal = (arr) => {
  [...new Set(arr)].forEach(elementName => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const textArr = elementName.replace('/#{', '').split('');
    textArr.pop();
    const cleanText = textArr.join('').replace('#{', '');
    label.setAttribute('for', `replace-${cleanText.replace(/ /g, '')}`);
    label.innerText = `Enter a variable for: ${elementName}`;
    input.setAttribute('id', `replace-${cleanText.replace(/ /g, '')}`);
    document.querySelector('#modal ._modal-content').appendChild(label);
    document.querySelector('#modal ._modal-content').appendChild(input);
  });
  modalState = 'replace';
};
const closeModal = () => {
  document.getElementById('modal').classList.remove('is-active');
  cleanModal();
}
const registerVariable = () => {
  if (modalState !== 'replace') {
    document.getElementById('modal').classList.remove('is-active');
    let variableInput = document.getElementById('modalInput').value;
    variableInput = `#{${variableInput.trim()}}`;
    cleanModal();
    document.querySelector(`#copy-paste-section ._section-item[data-index="${indexNo}"] textarea`).value += variableInput;
  }
  else {
    [...document.getElementById('modal').querySelector('._modal-content').childNodes].forEach(el => {
      if (el.nodeName === "LABEL") {
        copyPasteItem = copyPasteItem.replaceAll(el.innerText.replace('Enter a variable for: ', ''), el.nextElementSibling.value);
      }
    });
    document.querySelector(`#copy-paste-section ._section-item[data-index="${indexNo}"] textarea`).value = copyPasteItem;
    closeModal();
  }
}
const copyText = (el) => {
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied the text: " + el.value);
}
const openReplaceModal = (arr) => {
  document.getElementById('modal').classList.add('is-active');
  populateModal(arr);
}

const copyWithReplace = (e) => {
  const value = e.target.parentNode.previousElementSibling.value;
  copyPasteItem = value;
  const valueArr = value.match(/#{([^}]*)}/g);
  value.includes('#{') ? openReplaceModal(valueArr) : copyText(e.target.parentNode.previousElementSibling);
}