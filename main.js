'use strict'

// 待辦清單
const list = document.querySelector('#my-todo')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}
// 已完成清單
const doneList = document.querySelector('#my-done')
const done = []
// 清除清單
const trashList = document.querySelector('#my-trash')
const trash = []

//在todo list新增一個item
function addItem(text) {
  // 新增li
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

// 在done list新增一個item
function addToDone(text) {
  // 新增li
  let newDoneItem = document.createElement('li')
  newDoneItem.innerHTML = `
  <label for="Done" class="checked">${text
    }</label >
  `
  doneList.appendChild(newDoneItem)
}

// 在trash list新增一個item
function addToTrash(text) {
  // 新增li
  let newTrashItem = document.createElement('li')
  newTrashItem.innerHTML = `
  <label for = "trash">${text}</label>
  <i class="fas fa fa-undo"></i>
  `
  // 將li新增至trashList
  trashList.appendChild(newTrashItem)
}

// 選定todo的input
const todoInput = document.getElementById("newTodo");
// 在input按下ENTER時，要執行的動作：click button
todoInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    document.getElementById("addBtn").click()
  }
})

// ==========新增todo==========
// 選定add button
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', function (event) {
  // console.log(this)
  // console.log(event.target)
  let inputValue = todoInput.value

  if (inputValue !== '') {
    // 將inputValue放至My todo表格中
    addItem(inputValue)
    // 將inputValue放進todos陣列中
    todos.push(`${inputValue} `)
    // 清空input
    document.querySelector('#newTodo').value = ''
  } else {
    alert('input不得為空白')
  }
})

// =======刪除todo或將todo標示完成=======
list.addEventListener('click', function (event) {

  let todoIndex //todo在todos中的index
  let li = event.target.parentElement //選定li
  // ------- 刪除todo，並移至trash list-------
  if (event.target.classList.contains('delete')) {
    // 選取要被刪除的字串
    let deleteItem = li.firstElementChild

    // 刪除todos中該字串
    todoIndex = todos.indexOf(deleteItem.textContent)
    todos.splice(todoIndex, 1)

    // 把被刪除的字串加進trash陣列中 & 新增至頁面trash區
    trash.push(`${deleteItem.textContent}`)
    addToTrash(deleteItem.textContent)

    // 刪除My todo中該列
    li.remove()
  }
  // 標示已完成item，並移至done list
  else if (event.target.tagName === 'LABEL') {
    // 選定已完成item
    let completItem = event.target

    // 刪除todos中該字串
    todoIndex = todos.indexOf(completItem.textContent)
    todos.splice(todoIndex, 1)

    // 將已完成item加進doneList陣列中 & 將已完item新增至頁面done區
    done.push(`${completItem.textContent} `)
    addToDone(completItem.textContent)

    // 刪除My todo中該列
    li.remove()
  }
})


// =======復原trash list中的item，並移至todo list=======
trashList.addEventListener('click', function (event) {
  console.log(event)
  console.log(event.target)
  let li = event.target.parentElement
  let undoItem = li.firstElementChild
  let index
  if (event.target.classList.contains('fa-undo')) {
    index = trash.indexOf(undoItem.textContent)
    trash.splice(index, 1)
    todos.push(`${undoItem.textContent}`)
    li.remove()
    addItem(undoItem.textContent)
  }

})

// =======清空Trash list=======
const clearAll = document.getElementById('trashZone')
clearAll.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete')) {
    console.log(trash)
    for (let index in trash) {
      trash.splice(0, trash.length)
      console.log(index)
    }
    console.log(trash)
    trashList.innerHTML = `
    `
  }
})
