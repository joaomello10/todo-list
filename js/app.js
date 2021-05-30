const form = document.querySelector("form");
const input = document.querySelector(".input");
const ul = document.querySelector("ul");
const inputNull = document.querySelector(".input-null");

let getLocalStorage = JSON.parse(localStorage.getItem("todos"));

let todos = getLocalStorage !== null ? getLocalStorage : [];
addTodos();

function generateID() {
  return Math.round(Math.random() * 1000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() == "") {
    inputNull.style.display = "block";
    return;
  }

  inputNull.style.display = "none";

  const todo = {
    value: input.value,
    id: generateID(),
    class: "uncomplete",
  };

  todos.push(todo);
  setLocalStorage();
  addTodos();

  input.value = "";
});

function setLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodos() {
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add(todo.class);

    const p = document.createElement("p");
    p.innerHTML = todo.value;
    li.append(p);

    const div = document.createElement("div");
    div.append(completeBtn(todo));
    div.append(removeBtn(todo.id, li));

    ul.prepend(li);
    li.append(div);
  });
}

function completeBtn(todo) {
  const button = document.createElement("button");
  button.classList.add("complete-btn");
  button.innerHTML = '<i class="fas fa-check"></i>';

  button.addEventListener("click", () => {
    if (todo.class == "complete") {
      todo.class = "uncomplete";
    } else {
      todo.class = "complete";
    }
    setLocalStorage();
    addTodos();
  });

  return button;
}

function removeBtn(ID, li) {
  const button = document.createElement("button");
  button.classList.add("remove-btn");
  button.innerHTML = '<i class="fas fa-trash"></i>';

  button.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.id !== ID);
    li.classList.add("remove");

    setTimeout(() => {
      setLocalStorage();
      addTodos();
    }, 700);
  });

  return button;
}
