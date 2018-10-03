let taskInput = document.getElementById('task-input');
taskInput.focus();
let editMode = false;

// Add new task
add = () => {
  let newTask = taskInput.value;
  //check if the input is empty
  if (newTask == "") {
    alert('Enter a task');

  }
  if (!editMode) {
    //make the input empty after submit
    taskInput.value = '';

    let pTag = document.createElement('div');
    let taskListBlock = document.getElementById('taskListBlock');

    pTag.innerHTML = `
      <div id = "${new Date().getTime()}">
      - <span>${newTask}</span>
      <div class="actions">
      <a href="#" class="deleteBtn" onclick="deleteTask(this.parentNode.parentNode.id)"> 
      <i class="material-icons">
      clear
      </i>
       </a>
      <a href="#" class="editBtn" onclick="editTask(this.parentNode.parentNode.id)">
      <i class="material-icons">
      edit
      </i>
      </a>
      <a href="#"  class="doneBtn" onclick="doneTask(this.parentNode.parentNode.id)">
      <i class="material-icons">
      done
      </i>
      </a>
      </div>
      </div>`;

    taskListBlock.appendChild(pTag);

  } else {
    document.getElementById(this.editID).children[0].innerHTML = taskInput.value;
    taskInput.value = '';
    editMode = false;

  }
}

deleteTask = (id) => {
  document.getElementById(id).parentNode.remove();
}

editTask = (id) => {
  taskInput.focus();
  taskInput.value = document.getElementById(id).children[0].innerHTML;
  editMode = true;
  return editID = id;
}
doneTask = (id) => {
  console.log(id);
  document.getElementById(id).children[0].style.textDecoration = "line-through";
  document.getElementById(id).children[0].style.textDecorationColor = "green";
}

taskInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    add();
  }
})
