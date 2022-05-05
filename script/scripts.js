const DELETE_BTN_CLASS = 'delete-btn';
const INPUT_STRING = 'list_elements';
const DONE_CLASS = 'done';

const inputForm = document.querySelector('.input_block');
const toDoListEl = document.querySelector('.input_blocks');
const listTemplate = document.querySelector('.list_template').innerHTML;
const inputText = document.querySelectorAll('.input_elements');
const errorText = document.querySelector('.error');
const addBtn = document.querySelector('.input_btn');
const resultEl = document.querySelector('.input_blocks');

inputForm.addEventListener('submit', onContactFormSubmit);
toDoListEl.addEventListener('click', onContactsListClick);

let toDoList = [];

function onContactFormSubmit(e) {
    e.preventDefault();

    const newTask = getTask();

    if (isContactElValid(newTask)) {
        addTask(newTask);
        resetForm();
        removeError();
    } else {
        showError();
    }
}

function getTask() {
    const task = {};

    inputText.forEach((inp) => {
        task[inp.name] = inp.value;
    });

    return task;
}

function generateTaskHtml(task) {
    return listTemplate.replace('{{id}}', task.id)
                        .replace('{{Name}}', task.name)
                        .replace('{{Surname}}', task.surname)
                        .replace('{{Phone_number}}', task.phone_number);
}

function isContactElValid(task) {
    return isTextFieldValid(task.name)
        || isTextFieldValid(task.surname)
        || isPhoneFieldValid(task.phone_number);
}

function isTextFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isTextFieldValid(value) && !isNaN(value);
}

function addTask(task) {
    const newTaskHtml = generateTaskHtml(task);
    toDoListEl.insertAdjacentHTML('beforeend', newTaskHtml);

    toDoList.push(task);
    task.id = Date.now();
    renderList();
}

function getTaskID(el) {
    return +el.closest('.' + INPUT_STRING).dataset.id;
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        taskID = getTaskID(e.target);
        deleteTask(taskID);
    }   
}

function renderList() {
    toDoListEl.innerHTML = toDoList.map(generateTaskHtml).join('\n');
}

function resetForm() {
    inputForm.reset();
}

function showError() {
    errorText.classList.add('show');
}

function removeError() {
    errorText.classList.remove('show');
}

function deleteTask(id) {
    toDoList = toDoList.filter((task) => task.id !== id);

    renderList();
}