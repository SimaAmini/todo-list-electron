//  Defined Variavles
let fs = require('fs')
let arrayOfObjects, taskList;
let taskInput = document.getElementById('task-input');
taskInput.focus();
let editMode = false;
let elements = ` <div class="actions">
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
<a href="#" id="doneBtn" class="doneBtn" onclick="doneTask(this.parentNode.parentNode.id)">
<i class="material-icons">
done
</i>
</a>
</div>`;

//  Read from json file
fs.readFile('./tasks.json', 'utf-8', function (err, data) {
  if (err) throw err

  arrayOfObjects = JSON.parse(data);
  taskList = arrayOfObjects.tasks;

  taskList.forEach(element => {

    let pTag = document.createElement('div');
    let taskListBlock = document.getElementById('taskListBlock');
    pTag.innerHTML = `
      <div id = "${element.id}">
      - <span>${element.text}</span>
     ${elements}
      </div>`;
    taskListBlock.appendChild(pTag);
    if (element.status == true) {
      document.getElementById(element.id).children[0].style.textDecoration = "line-through green";
      document.getElementById(element.id).children[1].children[2].style.color = "green";

    }
  });

})


// Add new task
add = () => {
  let newTask = taskInput.value;
  //check if the input is empty
  if (newTask == "") {
    alert('Enter a task');
  } else if (!editMode) {
    //make the input empty after submit
    taskInput.value = '';
    let pTag = document.createElement('div');
    let taskListBlock = document.getElementById('taskListBlock');
    let elemID = new Date().getTime();
    pTag.innerHTML = `
      <div id = "${elemID}">
      - <span>${newTask}</span>
     ${elements}
      </div>`;

    taskListBlock.appendChild(pTag);

    arrayOfObjects.tasks.push({
      id: elemID,
      task: newTask,
      status: false
    })
    writeToFile();


  } else {
    // edit
    document.getElementById(this.editID).children[0].innerHTML = taskInput.value;
    const obj = taskList.filter(item => item.id == editID);
    const index = taskList.indexOf(obj[0]);
    taskList[index].text = newTask;

    arrayOfObjects.tasks = taskList;

    writeToFile();

    taskInput.value = '';
    editMode = false;

  }
}

deleteTask = (id) => {

  document.getElementById(id).parentNode.remove();

  const obj = taskList.filter(item => item.id == id);
  const index = taskList.indexOf(obj[0]);
  taskList.splice(index, 1);
  arrayOfObjects.tasks = taskList;

  writeToFile();

}

editTask = (id) => {
  taskInput.focus();
  taskInput.value = document.getElementById(id).children[0].innerHTML;
  editMode = true;
  return editID = id;
}

doneTask = (id) => {
  const obj = taskList.filter(item => item.id == id);
  const index = taskList.indexOf(obj[0]);
  if (!taskList[index].status) {
    taskList[index].status = true;
    document.getElementById(id).children[0].style.textDecoration = "line-through green";
    document.getElementById(id).children[1].children[2].style.color = "green";

  } else {
    taskList[index].status = false;
    document.getElementById(id).children[0].style.textDecoration = "none";
    document.getElementById(id).children[1].children[2].style.color = "#f5deb3";
  }

  arrayOfObjects.tasks = taskList;

  writeToFile();

}

//  Write in json file
writeToFile = () => {
  fs.writeFile('./tasks.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
    if (err) throw err
  })
}
//  event listener on enter key 
taskInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    add();
  }
})
