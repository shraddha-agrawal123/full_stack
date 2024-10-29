let todoList = [];
let comdoList = [];
let remList = [];

// Get references to the HTML elements
let addButton = document.getElementById("add-button");
let todoInput = document.getElementById("todo-input");
let deleteAllButton = document.getElementById("delete-all");
let allTodos = document.getElementById("all-todos");
let deleteSButton = document.getElementById("delete-selected");

// Event listeners
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Event listener for filtering and handling tasks
document.addEventListener('click', (e) => {
    if (e.target.className.includes('complete')) {
        completeTodo(e);
    }
    if (e.target.className.includes('delete')) {
        deleteTodo(e);
    }
});

// Event listener for Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Update task counts
function update() {
    comdoList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);
    document.getElementById("r-count").innerText = remList.length;
    document.getElementById("c-count").innerText = comdoList.length;
}

// Add a new task
function add() {
    let value = todoInput.value.trim();
    if (value === '') {
        alert("Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now(),
        complete: false,
    });
    todoInput.value = "";
    update();
    renderTodos(todoList);
}

// Render tasks in the list
function renderTodos(list) {
    allTodos.innerHTML = "";
    list.forEach(item => {
        let todoHtml = `
            <li id="${item.id}" class="todo-item">
                <input type="radio" name="todo-select" class="todo-radio" value="${item.id}">
                <p>${item.complete ? `<strike>${item.task}</strike>` : item.task}</p>
                <div class="todo-actions">
                    <button class="complete btn btn-success">✔</button>
                    <button class="delete btn btn-error">✖</button>
                </div>
            </li>`;
        allTodos.innerHTML += todoHtml;
    });
}

// Complete a task
function completeTodo(e) {
    let id = e.target.closest('.todo-item').id;
    todoList = todoList.map(item => {
        if (item.id === parseInt(id)) {
            item.complete = !item.complete;
        }
        return item;
    });
    update();
    renderTodos(todoList);
}

// Delete a specific task
function deleteTodo(e) {
    let id = e.target.closest('.todo-item').id;
    todoList = todoList.filter(item => item.id !== parseInt(id));
    update();
    renderTodos(todoList);
}

// Delete all tasks
function deleteAll() {
    todoList = [];
    update();
    renderTodos(todoList);
}

// Delete selected tasks
function deleteS() {
    const selectedRadio = document.querySelector('input[name="todo-select"]:checked');
    if (!selectedRadio) {
        alert("Please select a task to delete.");
        return;
    }
    const selectedId = parseInt(selectedRadio.value);
    todoList = todoList.filter(item => item.id !== selectedId);
    
    update();
    renderTodos(todoList);
}

// View all tasks
function viewAll() {
    renderTodos(todoList);
}

// View remaining tasks
function viewRemaining() {
    renderTodos(remList);
}

// View completed tasks
function viewCompleted() {
    renderTodos(comdoList);
}
