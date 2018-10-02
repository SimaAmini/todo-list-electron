// Add new task
let taskInput = document.getElementById('task-input');
taskInput.focus()

taskInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    let newTask = document.getElementById('task-input').value;

    //check if the input is empty
    if (newTask == "") {
      alert('Enter a task');

    } else {
      //make the input empty after submit
      document.getElementById('task-input').value = '';

      // keep focus on the input

      console.log(newTask);

      let pTag = document.createElement('p');
      let taskTag = document.createElement('span');
      let task = document.createTextNode(newTask);
      let taskListBlock = document.getElementById('taskListBlock');

      taskTag.appendChild(task);
      pTag.appendChild(taskTag);
      taskListBlock.appendChild(pTag);
    }
  }
})
