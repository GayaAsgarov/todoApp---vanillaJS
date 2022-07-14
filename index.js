let addTodoBtn = document.querySelector("#add-todo");
const todos = [];
let completedTodos = [];
let activeTodos = [];

// add todo to list
addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#todo").value;

    if (inputValue === "") {
        alert("Input is empty! Please, fill it");
    } else {
        todos.push({ todo: inputValue, status: "progress" });
        // todo container
        let newTodo = document.createElement("div");
        let newTodoContent = document.createElement("p");
        newTodo.appendChild(newTodoContent);
        let newTodoText = document.createTextNode(inputValue);
        newTodoContent.appendChild(newTodoText);

        // done button
        let doneBtn = document.createElement("button");
        newTodo.appendChild(doneBtn);
        doneBtn.classList.add("done-btn");
        doneBtn.appendChild(document.createTextNode("Done"));

        // remove button
        let removeBtn = document.createElement("button");
        newTodo.appendChild(removeBtn);
        removeBtn.classList.add("remove-btn");
        removeBtn.appendChild(document.createTextNode("Remove"));

        // edit button
        let editBtn = document.createElement("button");
        newTodo.appendChild(editBtn);
        editBtn.classList.add("edit-btn");
        editBtn.appendChild(document.createTextNode("Edit"));

        // add todo to the list
        let listOfTodos = document.querySelector(".todos-list");
        listOfTodos.appendChild(newTodo);


        let doneButtons = document.querySelectorAll(".done-btn");

        for (let i = 0; i < doneButtons.length; i++) {
            doneButtons[i].onclick = function (e) {
                e.preventDefault();
                todos[i].status = "done";
                this.parentNode.classList.toggle("done");
                if (this.textContent === "Done") {
                    this.textContent = "Undo";
                } else {
                    this.textContent = "Done";
                    todos[i].status = "progress";
                }
            }
        }

        let removeButtons = document.querySelectorAll(".remove-btn");

        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].onclick = function (e) {
                e.preventDefault();
                removeButtons[i].parentNode.remove();
            }
        }

        let editButtons = document.querySelectorAll(".edit-btn");
        let editBox = document.querySelector(".edit-box");

        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].onclick = function (e) {
                e.preventDefault();
                let newValue = prompt("Edit the value : ", this.parentNode.firstChild.textContent);
                if (newValue !== null && newValue !== "") {
                    this.parentNode.firstChild.textContent = newValue;
                } else if (newValue === "") {
                    alert("Error! Empty task");
                }
            }
        }

        // clear input
        document.querySelector("#todo").value = "";
        console.log(todos);
        console.log(doneBtn);


        console.log("Done:  " + completedTodos);
    }
})

let tabs = document.querySelectorAll(".tablink");
let tabContents = document.querySelectorAll(".tab-content");
tabs.forEach((tab) => {
    tab.onclick = function (e) {
        e.preventDefault();
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }
        tab.classList.add("active");

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("tab-content-active")
        });
        // filterTodos(todos);
        // completedTodos = [... new Set(completedTodos)];
        // activeTodos = [... new Set(activeTodos)];
        // console.log("Bitmis: " + JSON.stringify(completedTodos));
        // console.log("Aktiv: " + JSON.stringify(activeTodos));

        document.querySelector(`#${this.textContent.toLowerCase()}`).classList.add("tab-content-active");
        // showActiveContent();
        if (this.textContent.toLowerCase() === "active") {
            document.querySelector("#completed").innerHTML = "";
            todos.forEach((todo) => {
                if(todo.status === "progress") {
                    document.querySelector("#active").innerHTML += `
                        <div>${todo.todo}<div>
                    `;
                }
            });
        } 
        else if(this.textContent.toLowerCase() === "completed") {
            document.querySelector("#active").innerHTML = "";
            todos.forEach((todo) => {
                if(todo.status === "done") {
                    document.querySelector("#completed").innerHTML += `
                        <div>${todo.todo}<div>
                    `;
                }
            });
        }
    }
})



function filterTodos(todos) {
    todos.forEach((todo) => {
        if (todo.status === "done") {
            completedTodos.push(todo);
        } else {
            activeTodos.push(todo);
        }
    })
}

const darkMode =()=> {
    document.querySelector("body").classList.toggle("dark");
}

// let setDarkMode = localStorage.getItem("dark");

// if(setDarkMode === "on") {
//     darkMode();
// }

document.querySelector(".fa-moon").addEventListener("click",() => {
    setDarkMode = localStorage.getItem("dark");

    if(setDarkMode !== "on") {
        darkMode();
        setDarkMode = localStorage.setItem("dark","on");
    } else {
        darkMode();
        setDarkMode = localStorage.setItem("dark",null);
    }
})
