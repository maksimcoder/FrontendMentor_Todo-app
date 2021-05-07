// - Add new todos to the list --- DONE
// - Mark todos as complete --- DONE
// - Delete todos from the list --- DONE
// - Filter by all/active/complete todos --- DONE
// - Clear all completed todos --- DONE
// - Toggle light and dark mode
// - Local Storage db --- DONE
// - **Bonus**: Drag and drop to reorder items on the list


'use strict';

const input = document.querySelector('.todo-input');

let todoAmount = 0,
    totalRender = 0;
try {
    todoAmount = +localStorage.getItem('todoAmount');
} catch (error) {
    localStorage.setItem('todoAmount', '0');
}



countAllTodos();

class TodoConstructor {
    constructor(input = null, parentSelector = null) {
        if (input.tagName != 'INPUT') {
            this.value = input;
            console.log(input);
        } else {
            this.value = input.value;
        }
        this.parent = document.querySelector(parentSelector);
    }

    
    
    render() {
        if (document.querySelector('.text-container')) {
            document.querySelector('.text-container').style.display = 'none';
        }
        
        const newTodo = document.createElement('div');
        newTodo.classList.add('new-todo-container', 'new-container', 'not-completed', 'show');
        newTodo.setAttribute('data-value', this.value);

        newTodo.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" id="new-todo-${totalRender}"  name="inputs" class="custom-checkbox">
                <label for="new-todo-${totalRender}" class="checkbox-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                    <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/>
                <svg>
                </label>
            </div>
            <span class="todo-text">${this.value}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="close close-enable"><path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        `;
        this.parent.prepend(newTodo);
        totalRender++;
        countAllTodos();
    }
}
checkLocalStorage();

function checkEmptyInput() {
    input.addEventListener('input', () => {
        if (input.value == '') {
            document.querySelector('.new-todo-container').style.border = '1px solid red';
        } else {
            document.querySelector('.new-todo-container').style.border = '1px solid hsl(0, 0%, 90%)';
        }
    });
}

function checkForEmptyContent() {
    const contentContainer = document.querySelector('.content-container');
    contentContainer.addEventListener('click', () => {
        if (!document.querySelectorAll('.close-enable').length) {
            document.querySelector('.text-container').style.display = 'flex';
        } 
    });
}

function createNewTodo() {
    input.addEventListener('keydown', (e) => {
        if (e.code === "Enter" && input.value !== '') { 
            ++todoAmount;
            localStorage.setItem('todoAmount', `${todoAmount}`);
            new TodoConstructor(input, '.content-container').render();
            localStorage.setItem(`${input.value}`, `${input.value}`);
            input.value = '';
            checkForEmptyContent();
            bindTodoDelete();
            markAsCompleted();
        }
    });
}



function bindTodoDelete(){
    const deleteBtns = document.getElementsByClassName("close-enable");
    for( let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].onclick = function() {
            const parent = this.parentElement;
            parent.remove();
            --todoAmount;
            localStorage.setItem('todoAmount', `${todoAmount}`);
            // console.log(this.parentElement.getAttribute('data-value'));
            localStorage.removeItem(`${this.parentElement.getAttribute('data-value')}`);
            countAllTodos(); 
        };
    }
    /* 
        Peeked the function idea from Aayushi Simzia code
        Profile: https://www.frontendmentor.io/profile/iucsim
        Thanks!
    */
}

function countAllTodos() {
    const todoCount = document.querySelectorAll(`.new-container[class~="show"]`);
    document.querySelector('.items-left').textContent = `${todoCount.length} items left`;
}

createNewTodo();
checkEmptyInput();

function checkLocalStorage() {
    if (localStorage.length) {
        for (let i = 0; i < localStorage.length; i++) { 
            if (localStorage.key(i) == 'todoAmount') {
                continue;
            } else {
                todoAmount = +localStorage.getItem('todoAmount');
                new TodoConstructor(localStorage.key(i), '.content-container').render();
                markAsCompleted();
            }
            
        }
        bindTodoDelete();
    } else {
        console.log('-');
    }
}

// Lists Toggle




function markAsCompleted() {
    const checkboxes = document.querySelectorAll('.checkbox-label');
    checkboxes.forEach(box => {
        box.onclick = () => {
            box.closest('.new-container').classList.toggle('not-completed');
            box.closest('.new-container').classList.toggle('completed');
            console.log('toggle Done');   
        };
    });
}


function changeSelectedList() {
    const listBtnsParent = document.querySelector('.footer-states'),
          listBtns = document.querySelectorAll('.footer-states li');
    listBtns.forEach(btn => btn.classList.remove('active'));
    listBtnsParent.addEventListener('click', (e) => {
        const targetClasses = e.target.classList[1],
              target = e.target;
        switch (targetClasses) {
            case 'all-items':
                target.classList.add('active');
                break;
            case 'items-active':
                target.classList.add('active');
                break;
            case 'items-completed':
                target.classList.add('active');
                break;
            default:
                console.log('Switch didn`t work');
                break;
        }
    });
    countAllTodos();
}

function bindListItem(listBtnSelector, shownListSelector, hiddenListSelector = null ) {
    const listBtn = document.querySelector(listBtnSelector);
    listBtn.addEventListener('click', () => {
        document.querySelectorAll(hiddenListSelector).forEach(todo => {
            todo.classList.remove('show');
            todo.classList.add('hide');
            
        });
        document.querySelectorAll(shownListSelector).forEach(todo => {
            todo.classList.remove('hide');
            todo.classList.add('show');
        });
        changeSelectedList();
    });
    
}

function clearCompleted(btnSelector) {
    const clearBtn = document.querySelector(btnSelector);
    clearBtn.addEventListener('click', () => {
        document.querySelectorAll('.completed').forEach(todo => {
            todo.remove();
            if (localStorage.getItem(todo.getAttribute('data-value'))) {
                localStorage.removeItem(todo.getAttribute('data-value'));
                todoAmount--;
                localStorage.setItem('todoAmount', todoAmount);
            }
        });
        
        countAllTodos();
    });
}

// Dark mode

document.querySelector('.change-theme').addEventListener('click', () => {
    const alertBlock = document.createElement('div');
    alertBlock.classList.add('alertBlock');
    alertBlock.textContent = 'Currently unavailable';
    document.querySelector('.header-container').append(alertBlock);
    document.querySelector('.change-theme').style.display = 'none';
    setTimeout(() => {
        alertBlock.remove();
        document.querySelector('.change-theme').style.display = '';
    }, 2500);
});

bindListItem('.items-completed', '.completed', '.not-completed');
bindListItem('.items-active', '.not-completed', '.completed');
bindListItem('.all-items', '.not-completed');
bindListItem('.all-items', '.completed');
clearCompleted('.clear-btn');
