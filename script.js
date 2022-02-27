var todos=[]
function init()
{
  var leftdiv=document.createElement("div");

  var heading=document.createElement("h1");
  heading.innerHTML="Task List";
  leftdiv.appendChild(heading);

  var subheading=document.createElement("h3");
  subheading.innerHTML="Add Task";
  leftdiv.appendChild(subheading);
  var rightdiv=document.createElement("div");

  leftdiv.setAttribute("id","leftDiv");
  rightdiv.setAttribute("id","rightDiv");

  document.body.appendChild(leftdiv);
  document.body.appendChild(rightdiv);

  var inputTodo=document.createElement("textarea");
  inputTodo.setAttribute("placeholder","Enter Tasks");
  inputTodo.setAttribute("class","textbox");
  inputTodo.setAttribute("id","todobox");
  rightdiv.appendChild(inputTodo);

  inputTodo.addEventListener("keyup",eventHandler);



  function eventHandler(event)
  {
      var key=event.code;
      var todo=document.getElementById("todobox");
      var val=todo.value;
      if(key==="Enter" && val!="")
      {
          event.preventDefault();
          var container=document.createElement("div");
          var task=document.createElement("p");
          var checkbox=document.createElement("input");
          var deletebutton=document.createElement("i");
          var editbutton = document.createElement("i");

          container.setAttribute("class","todoContainer");

          checkbox.setAttribute("id","check");
          checkbox.setAttribute("type","checkBox");
          checkbox.setAttribute("onclick", "checkboxClick(this)");
    
          deletebutton.setAttribute("id", "deleteButton");
          deletebutton.setAttribute("onclick", "deleteTodo(this)");
          deletebutton.setAttribute("class", "fa-solid fa-xmark");

          editbutton.setAttribute("id", "editButton");
          editbutton.setAttribute("onclick", "editTodo(this)");
          editbutton.setAttribute("class", "fa-solid fa-pencil");

          container.appendChild(task);
          container.appendChild(checkbox);
          container.appendChild(editbutton);
          container.appendChild(deletebutton);

          task.innerHTML=val;
          todos.push(val);

          localStorage.setItem("todos",JSON.stringify(todos));

          var leftpane=document.getElementById("leftDiv");
          leftpane.appendChild(container);
          
          todo.value="";

      }
        
  }

}
init();

let storedtodos = localStorage.getItem("todos");
if(storedtodos!==null)
    todos=JSON.parse(storedtodos);

todos.forEach(function( val ){    
    var container=document.createElement("div");
    var task=document.createElement("p");
    var checkbox=document.createElement("input");
    var deletebutton=document.createElement("i");
    var editbutton = document.createElement("i");
    
    container.setAttribute("class","todoContainer");

    checkbox.setAttribute("id","check");
    checkbox.setAttribute("type","checkBox");
    checkbox.setAttribute("onclick", "checkboxClick(this)");

    deletebutton.setAttribute("id", "deleteButton");
    deletebutton.setAttribute("onclick", "deleteTodo(this)");
    deletebutton.setAttribute("class", "fa-solid fa-xmark");

    editbutton.setAttribute("id", "editButton");
    editbutton.setAttribute("onclick", "editTodo(this)");
    editbutton.setAttribute("class", "fa-solid fa-pencil");

    container.appendChild(task);
    container.appendChild(checkbox);
    container.appendChild(editbutton);
    container.appendChild(deletebutton);
    
    task.innerHTML=val;

    var leftpane=document.getElementById("leftDiv");
    leftpane.appendChild(container);
});

function checkboxClick(checkbox){
    if (checkbox.checked) {
        checkbox.parentElement.firstChild.style.textDecoration = "line-through";
    } else {
        checkbox.parentElement.firstChild.style.textDecoration = "none";
    }
}

function deleteTodo(deletebutton, stringValue) {
    var text = deletebutton.parentElement.firstChild.innerHTML;
    var index = todos.indexOf(text);
    todos.splice(index, 1);

    localStorage.clear;
    localStorage.setItem("todos", JSON.stringify(todos));
    deletebutton.parentElement.remove();
}

function editTodo(editbutton) {
    var task = prompt("Edit your task");
    if (task !== null) {
        var taskHeading = editbutton.parentElement.firstChild;
        todos[todos.indexOf(taskHeading.innerHTML)] = task;
        taskHeading.innerHTML = task;
        localStorage.clear;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}