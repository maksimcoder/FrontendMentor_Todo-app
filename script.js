// - Add new todos to the list --- DONE
// - Mark todos as complete --- SEMI
// - Delete todos from the list --- DONE
// - Filter by all/active/complete todos
// - Clear all completed todos
// - Toggle light and dark mode
// - **Bonus**: Drag and drop to reorder items on the list

// 1 - Разобраться с удалением задачи


'use strict';

const input = document.querySelector('.todo-input');
let count = 0,
    todoAmount = 0;

document.querySelector('.items-left').textContent = `${todoAmount} items left`;

class TodoConstructor {
    constructor(input, parentSelector) {
        this.value = input.value;
        this.parent = document.querySelector(parentSelector);
    }

    
    render() {
        if (document.querySelector('.text-container')) {
            document.querySelector('.text-container').style.display = 'none';
        }
        
        const newTodo = document.createElement('div');
        newTodo.classList.add('new-todo-container', 'new-container');

        newTodo.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" id="new-todo-${todoAmount}"  name="inputs" class="custom-checkbox">
                <label for="new-todo-${todoAmount}">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                    <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/>
                <svg>
                </label>
            </div>
            <span class="todo-text">${this.value}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="close close-enable"><path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        `;
        this.parent.prepend(newTodo);
        countAllTodos();
        
        
    }
}

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
            console.log(todoAmount);
            new TodoConstructor(input, '.content-container').render();
            input.value = '';
            checkForEmptyContent();
            deleteBtnClick();
            // bindTodoDelete();
        }
    });
}


// function bindTodoDelete() {
//     const deleteBtns = document.querySelectorAll('.close-enable');
//     --todoAmount;
//     for (let i = 0; 0 < deleteBtns.length; i++) {
//         deleteBtns[i].addEventListener('click', (e) => {
//             if (e.target.tagName == 'svg') {
//                 e.target.parentElement.remove();
//             } else {
//                 const parent = e.target.parentElement;
//                 parent.parentElement.remove();
//             }
//         });
//         countAllTodos();
//     }
    
// }

function deleteBtnClick(){
    const deleteBtns = document.getElementsByClassName("close-enable");
    const deleteBtnss = document.querySelectorAll(".close-enable");
    var j;
    deleteBtnss.forEach(item => {
        item.addEventListener('click', (e) => {
            const parent = e.target.parentElement;
            if (e.target.tagName == 'svg') {
                parent.remove();
            } else {
                parent.parentElement.remove();
            }
            --todoAmount;
            console.log(todoAmount);
            countAllTodos();
        });
    });
    // for( j = 0; j < deleteBtns.length; j++){
    //     deleteBtns[j].onclick = function() {
    //         const parent = this.parentElement;
    //         parent.remove();
    //         --todoAmount;
    //         countAllTodos();
    //     }; 
    // }
}

function countAllTodos() {
    document.querySelector('.items-left').textContent = `${todoAmount} items left`;
}



createNewTodo();
checkEmptyInput();






