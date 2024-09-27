    const todos = [];
    const RENDER_EVENT = 'render-todo';  
    
    document.addEventListener('DOMContentLoaded', function () {   
        const submitForm = document.getElementById('form');
        submitForm.addEventListener('submit', function (event) {
          event.preventDefault();
          addTodo();
        });
    });    

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';
 
    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        uncompletedTODOList.append(todoElement);
    }
});

function generateId() {
    return +new Date();
    }
    
    function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
        }
    }

function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;
    
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    }    

function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;
    
    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
    
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);
    
    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
        
        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(todoObject.id);
        });
        
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
        
        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(todoObject.id);
        });
        
        container.append(undoButton, trashButton);
        } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        
        checkButton.addEventListener('click', function () {
            addTaskToCompleted(todoObject.id);
        });
        
        container.append(checkButton);
        }
        
        return container;

function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
    
    if (todoTarget == null) return;
    
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    }

function findTodo(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id === todoId) {
        return todoItem;
        }
    }
    return null;
    }    

};