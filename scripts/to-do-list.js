const todolist = [
  {
    name: "Task 1",
    dueDate: "09/23/2023",
  },
  {
    name: "Task 2",
    dueDate: "10/23/2023",
  },
];
renderTodoList();

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function renderTodoList() {
  let todolistHTML = "";

  todolist.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>  
    <div>${dueDate}</div>  
    <button class= "delete-todo-button js-delete-todo-button ">Delete</button>
    `;
    todolistHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todolistHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todolist.splice(index, 1);
        renderTodoList();
      });
    });
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const inputDateElement = document.querySelector(".js-due-date-input");
  const dueDate = inputDateElement.value;

  todolist.push({
    name,
    dueDate,
  });

  inputElement.value = "";
  renderTodoList();
}
