// Add new task
function add() {
  let newTask = document.getElementById('task-input').value;
  let taskInput = document.getElementById('task-input');

  //check if the input is empty
  if (newTask == "") {
    alert('Enter a task');

  } else {
    //make the input empty after submit
    document.getElementById('task-input').value = '';

    // keep focus on the input
    taskInput.focus()

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
