let selectedWebsite = 'https://www.google.com/search?q=';
let modalState = '';
let copyPasteItem = '';
let isTyping = false;
let title = '';
let description = '';
let indexNo = 0;
let timeout;
const Wilmut = document.querySelector('#_todo-section .__section-item[data-index="0"]');
const Ian = document.querySelector('#_copy-paste-section .__section-item[data-index="0"]');
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
  const query = document.getElementById('___search-bar').value.toString();
  if (query) {
    window.location = selectedWebsite + query.trim();
  }
}

window.addEventListener('load', () => {
  document.querySelector('.__search-bar-wrapper').classList.add('active');
});

const border = () => {
  document.querySelector('.__search-bar .__input-wrapper').classList.add('active');
}

const noBorder = () => {
  document.querySelector('.__search-bar .__input-wrapper').classList.remove('active');
}

const buttonFunc = (e) => {
  e.stopPropagation();
  document.querySelectorAll('.__dropdown.active .__flat-button').forEach(button => button.classList.remove('_is-visible'));
  document.querySelector(`.__dropdown .__flat-button[data-area=${e.target.dataset.area}]`).classList.add('_is-visible');
  document.querySelector('.__search-bar .__input-wrapper input').placeholder = `Search on ${e.target.dataset.area}`;
  selectedWebsite = e.target.dataset.query;
  document.querySelector('.__dropdown').classList.remove('active');
  document.querySelectorAll('.__dropdown .__flat-button').forEach(button => button.removeEventListener('click', buttonFunc));
}

document.querySelector('.__dropdown').addEventListener('click', () => {
  document.querySelector('.__dropdown').classList.add('active');
  document.querySelectorAll('.__dropdown.active .__flat-button').forEach(button => button.classList.add('_is-visible'));
  document.querySelectorAll('.__dropdown.active .__flat-button').forEach(button => button.addEventListener('click', buttonFunc));
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
    e.target.parentNode.querySelector('.__auto-save').classList.remove('active');
    window.clearTimeout(timeout);
  }
};

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

const cleanModal = () => {
  [...document.querySelector('#_modal .__modal-content').childNodes].forEach(el => { if (el.nodeName !== 'DIV') { el.remove() } });
};

const openModal = (e) => {
  indexNo = e.target.parentNode.parentNode.dataset.index;
  document.getElementById('_modal').classList.add('active');
  cleanModal();
  const label = document.createElement('label');
  label.setAttribute('for', 'variable');
  label.innerText = 'Enter a variable';
  const input = document.createElement('input');
  input.setAttribute('id', 'modalInput');
  document.querySelector('#_modal .__modal-content').appendChild(label);
  document.querySelector('#_modal .__modal-content').appendChild(input);
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
    document.querySelector('#_modal .__modal-content').appendChild(label);
    document.querySelector('#_modal .__modal-content').appendChild(input);
  });
  modalState = 'replace';
};
const closeModal = () => {
  document.getElementById('_modal').classList.remove('active');
  cleanModal();
}
const registerVariable = () => {
  if (modalState !== 'replace') {
    document.getElementById('_modal').classList.remove('active');
    let variableInput = document.getElementById('modalInput').value;
    variableInput = `#{${variableInput.trim()}}`;
    cleanModal();
    document.querySelector(`#_copy-paste-section .__section-item[data-index="${indexNo}"] textarea`).value += variableInput;
  }
  else {
    [...document.getElementById('_modal').querySelector('.__modal-content').childNodes].forEach(el => {
      if (el.nodeName === "LABEL") {
        copyPasteItem = copyPasteItem.replaceAll(el.innerText.replace('Enter a variable for: ', ''), el.nextElementSibling.value);
      }
    });
    document.querySelector(`#_copy-paste-section .__section-item[data-index="${indexNo}"] textarea`).value = copyPasteItem;
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
  document.getElementById('_modal').classList.add('active');
  populateModal(arr);
}

const copyWithReplace = (e) => {
  const value = e.target.parentNode.previousElementSibling.value;
  copyPasteItem = value;
  const valueArr = value.match(/#{([^}]*)}/g);
  value.includes('#{') ? openReplaceModal(valueArr) : copyText(e.target.parentNode.previousElementSibling);
}