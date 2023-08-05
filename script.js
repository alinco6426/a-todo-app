//  addToList();

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
function addToList() {
    let input = document.getElementById("input");
    let inputValue = input.value;
    if(inputValue === ""){
      alert("This field cannot be empty")
  }else{
      let todo = {
        title: inputValue,
        status: "pending"
    }
    todoList.push(todo);
    input.value = "";
  }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    filterList("all");
    listLength()
 }
  // filterlist function
 function filterList(filter) {
    let container = document.getElementById('list');
    container.innerHTML = "";
    let mainTodo;
    if(filter === "all"){
       mainTodo = todoList;
    } else if ( filter === "pending"){
        mainTodo = todoList.filter(function (item) {
             return item.status === "pending";
        })
    } else if (filter === "completed"){
        mainTodo = todoList.filter(function (item) {
            return  item.status === "completed";
    })}
    for (let x = 0; x < mainTodo.length; x++) {
      const listItem = document.createElement("li");
      listItem.textContent = mainTodo[x].title;
      listItem.className = mainTodo[x].status;
      const button = document.createElement("button");
      button.className = "toggle";
      button.id = "check-btn"
      const removeItemBtn = document.createElement("span");
      removeItemBtn.className = "remove";
      removeItemBtn.id = "remove";
      const removeImg = document.createElement("img");
      removeImg.src = "icon-cross.svg";
      let tickImg = document.createElement("img");
      tickImg.className ="check-img";
      tickImg.src = "icon-check.svg";
      const listItemContainer = document.createElement("div");
      listItemContainer.className = "item-container";
      let modalBox = document.createElement("div");
      modalBox.className = "modal-box";
      button.addEventListener("click",function () {
          if(mainTodo[x].status === "pending"){
              mainTodo[x].status = "completed";
          }else{
              mainTodo[x].status = "pending";
          }

          if(this.className === "toggle"){
            this.classList.remove("toggle");
            this.classList.add("checked");
            tickImg.classList.add("visible-btn");
            tickImg.classList.remove("check-img")
          }else{
            this.classList.remove("checked");
            this.classList.add("toggle");
            tickImg.classList.remove("visible-btn");
            tickImg.classList.add("check-img");
          }
          listItem.className = mainTodo[x].status;
          listLength()
      });
      if (mainTodo[x].status === "completed") {
        button.classList.add("checked");
        tickImg.classList.add("visible-btn")
      }
      removeItemBtn.addEventListener("click", function () {
        const modalBox = document.createElement("div");
        modalBox.className = "modal-box";
        const modalMessage = document.createElement("div");
        modalMessage.className = "modal-message";
        // modalMessage.classList.add("bgcolor");
        const modalTitle = document.createElement("h3");
        modalTitle.textContent = "Delete Item.";
        const modalText = document.createElement("p");
        modalText.textContent = "Are you sure you want to delete this item?";
        const confirmBtns = document.createElement("div");
        confirmBtns.className = "confirm-btns";
        const cancelButton = document.createElement("button");
        cancelButton.id = "cancel";
        cancelButton.textContent = "Cancel";
        const deleteButton = document.createElement("button");
        deleteButton.id = "delete";
        deleteButton.textContent = "Delete";
       
        cancelButton.addEventListener("click", function () {
          modalBox.remove();
        });
  
        deleteButton.addEventListener("click", function () {
          const removeNodeParent = listItem.parentNode;
          removeNodeParent.remove();
          const itemIndex = todoList.indexOf(mainTodo[x]);
          todoList.splice(itemIndex, 1);
          localStorage.setItem("todoList", JSON.stringify(todoList));
          modalBox.remove();
          listLength();
        });
  
        confirmBtns.appendChild(cancelButton);
        confirmBtns.appendChild(deleteButton);
        modalMessage.appendChild(modalTitle);
        modalMessage.appendChild(modalText);
        modalMessage.appendChild(confirmBtns);
        modalBox.appendChild(modalMessage);
        document.body.appendChild(modalBox);
        if (isLightTheme) {
          modalMessage.className = "light-modal";
        }
      });
      if(isLightTheme){
        listItemContainer.classList.add("screen");
      }
      listItemContainer.addEventListener("mouseover", function () {
        removeItemBtn.style.visibility = "visible";
      });
  
      listItemContainer.addEventListener("mouseout", function () {
        removeItemBtn.style.visibility = "hidden";
      });
      button.appendChild(tickImg);
      removeItemBtn.append(removeImg);
      listItemContainer.appendChild(button);
      listItemContainer.appendChild(listItem);
      listItemContainer.appendChild(removeItemBtn);
      container.appendChild(listItemContainer);
    }
    listLength();
 }
 
//  filtering buttons

let allBtn = document.getElementById('all');
let pendingBtn = document.getElementById('active');
let completedBtn = document.getElementById('completed')
allBtn.addEventListener("click",function () {
    filterList("all");
})
pendingBtn.addEventListener("click", function () {
    filterList("pending");
})
completedBtn.addEventListener("click",function () {
    filterList("completed");
})

// clear button
let clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click",function(){
let completedItems = todoList.filter( function (item){
  return item.status ==="completed"
})
for(let i = 0; i < completedItems.length; i++){
  let itemIndex = todoList.indexOf(completedItems[i]);
  todoList.splice(itemIndex,1);
}
localStorage.setItem("todoList", JSON.stringify(todoList));
filterList("all");
});
   
  // list lengths
  function listLength() {
    const listLength = todoList.length;
    const completeListLength= todoList.filter( function (item) {
      return item.status === "pending";
    })
    let length = document.getElementById("demo");
  length.innerHTML = completeListLength.length +" " + "/" + " " + listLength;
} 

// Themes
let isLightTheme = JSON.parse(localStorage.getItem('isLightTheme')) || false;


function applyTheme() {
  const dayIcon = document.getElementById("image");
  const theBody = document.body;
  const interface = document.getElementById("screen");
  const filterButtons = document.getElementsByClassName("white");
  const itemCounter = document.getElementById("item-counter");
  const inputColor = document.getElementById("input");
  const footDiv = document.getElementsByClassName("foot-div");
  const listItemContainers = document.getElementsByClassName("item-container");
  const createIcon = document.getElementsByClassName("create-icon")[0];
  if (isLightTheme) {
    dayIcon.src = "icon-moon.svg";
    theBody.classList.add("theme");
    interface.classList.add("screen");
    inputColor.classList.add("input");
    itemCounter.classList.add("counter-color");
    createIcon.classList.add("create-icon-color");
    for (let x of filterButtons) {
      x.classList.add("colors");
    }
    for( x of footDiv){
      x.classList.add("screen");
    }
    for (let listItemContainer of listItemContainers) {
        listItemContainer.classList.add("screen");
      } 
    }else {
    dayIcon.src = "icon-sun.svg";
    theBody.classList.remove("theme");
    interface.classList.remove("screen");
    inputColor.classList.remove("input");
    itemCounter.classList.remove("counter-color");
    createIcon.classList.remove("create-icon-color");
    for (let x of filterButtons) {
      x.classList.remove("colors");
    }
    for( x of footDiv){
      x.classList.remove("screen");
    }
    for (let listItemContainer of listItemContainers) {
    listItemContainer.classList.remove("screen");
    }
  }  
}

function toggleTheme() {
  isLightTheme = !isLightTheme;
  localStorage.setItem('isLightTheme', JSON.stringify(isLightTheme));
  applyTheme();
}
let Switch = document.getElementById("switch");
Switch.addEventListener("click", toggleTheme);
applyTheme();
filterList("all");

