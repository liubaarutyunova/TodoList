//Problem: user interaction doesn't provide disered results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incomletedTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var comletedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//new task list item
var createNewTaskElement = function(taskString) {
	//create list item
	var listItem = document.createElement("li") ;

	//input (checkbox)
	var chechBox = document.createElement("input");
	//label
	var label = document.createElement("label");
	//input(text)
	var editInput = document.createElement("input");
	//button.edit
	var editButton = document.createElement("button");
	//button.delete;
	var deleteButton = document.createElement("button");
	//Each elements, needs modified

	chechBox.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	label.innerText = taskString;

	//and appended
	listItem.appendChild(chechBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}


//Add a new task
var addTask = function() {
	console.log("Add task...");
	//When the button is pressedvar
	//Create a new list item with the text from #new-task
	var listItem = createNewTaskElement(taskInput.value);

	//append listItem to incomletedTasksHolder
	incomletedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskComleted);
	taskInput.value = "";
}


//Edit an existing task
var editTask = function() {
	console.log("Edit task...");
	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var containsClass = listItem.classList.contains("editMode")	;
	//if the class of the parent is .editMode
	if(containsClass) {
		//switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;
	} else {
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");
}



//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//Remove the parent list item from the ul
	ul.removeChild(listItem);

}


//Mark a task as complete
var taskComleted = function() {
	console.log("Task comleted...");
	//Append the task list item to the #comleted-tasks
	var listItem = this.parentNode;
	comletedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomleted);
}


//Mark a task as incomplete
var taskIncomleted = function() {
	console.log("Task incomleted...");
	//Append the task list item to the #incomleted-tasks
	var listItem = this.parentNode;
	incomletedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskComleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	console.log("Bind list item events");
	//select taskListItem children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editBotton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	//bind editTask to edit button
	editBotton.onclick = editTask;
	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;
	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;

}

var ajaxRequest = function() {
	console.log("AJAX request");
}


//Set the click handler to the addTask function
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);



//Cycle over incomletedTasksHolder ul list items
for(var i = 0; i < incomletedTasksHolder.children.length; i++) {
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incomletedTasksHolder.children[i],taskComleted);
}


//Cycle over comletedTasksHolder ul list items
for(var i = 0; i < comletedTasksHolder.children.length; i++) {

	bindTaskEvents(comletedTasksHolder.children[i], taskIncomleted);
}
