let taskArr = []

const input_taskName = document.querySelector("#task-name")
const input_taskDate = document.querySelector("#task-date")
const input_taskPriority = document.querySelector("#task-priority")
const taskAddBtn = document.querySelector("#task-add")

let taskToday = document.querySelector(".todoList-today")
let taskFuture = document.querySelector(".todoList-future")
let taskComplete = document.querySelector(".todoList-complete")


let todayCount = 1
let futureCount = 1
let completeCount = 1
taskAddBtn.addEventListener("click", () => {
    const name = input_taskName.value
    const date = new Date(input_taskDate.value)
    const priority = input_taskPriority.value

    const taskObj = {
        name: name,
        date: date.toLocaleDateString('en-GB'),
        priority: priority,
        completed: 'false'
    }
    taskArr.push(taskObj)
    localStorage.setItem('taskArr', JSON.stringify(taskArr))

    let taskDiv = document.createElement("div")
    taskDiv.className = "taskDiv"

    let taskName = document.createElement("p")
    taskName.className = "taskName"

    let taskDate = document.createElement("p")
    taskDate.className = "taskDate"
    taskDate.innerText = `${taskObj.date}`

    let taskPriority = document.createElement("p")
    taskPriority.className = "taskPriority"
    taskPriority.innerText = `Priority: ${taskObj.priority}`

    let taskIcons = document.createElement("div")
    taskIcons.className = "taskIcons"

    let taskCompleteBtn = document.createElement("button")
    taskCompleteBtn.className = "taskCompleteBtn"
    let taskCompleteIcon = document.createElement("i")
    taskCompleteIcon.className = "fa-regular fa-circle-check"
    taskCompleteBtn.append(taskCompleteIcon)

    let taskDeleteBtn = document.createElement("button")
    taskDeleteBtn.className = "taskDeleteBtn"
    let taskDeleteIcon = document.createElement("i")
    taskDeleteIcon.className = "fa-regular fa-trash-can"
    taskDeleteBtn.append(taskDeleteIcon)

    taskIcons.append(taskCompleteBtn)
    taskIcons.append(taskDeleteBtn)

    taskDiv.append(taskName)
    taskDiv.append(taskDate)
    taskDiv.append(taskPriority)
    taskDiv.append(taskIcons)

    let currentDate = new Date()
    currentDate = currentDate.toLocaleDateString('en-GB')

    if (currentDate === taskObj.date) {
        taskName.innerText = `${todayCount++}. ${taskObj.name}`
        taskToday.append(taskDiv)
    }
    else if (currentDate < taskObj.date) {
        taskName.innerText = `${futureCount++}. ${taskObj.name}`
        taskFuture.append(taskDiv)
    }
    else {
        taskName.innerText = `${futureCount++}. ${taskObj.name}`
        taskDiv.classList.add("hide")
        taskFuture.append(taskDiv)
    }

    taskCompleteBtn.addEventListener("click", (e) => {
        let parent_taskDiv = e.target.parentElement.parentElement.parentElement
        let selectedTask = parent_taskDiv.firstChild

        for (let i = 0; i < taskArr.length; i++) {
            if (selectedTask.innerText.slice(2).trim() === taskArr[i].name) {
                taskArr[i].completed = 'true'
                break
            }
        }
        localStorage.setItem('taskArr', JSON.stringify(taskArr))
        parent_taskDiv.firstChild.innerText = `${completeCount++}. ${selectedTask.innerText.slice(2)}`
        parent_taskDiv.lastChild.firstChild.remove()
        parent_taskDiv.classList.remove("hide")
        taskComplete.append(parent_taskDiv)

    })

    taskDeleteBtn.addEventListener("click", (e) => {
        let parent_taskDiv = e.target.parentElement.parentElement.parentElement
        let selectedTask = parent_taskDiv.firstChild
        for (let i = 0; i < taskArr.length; i++) {
            if (selectedTask.innerText.slice(2).trim() === taskArr[i].name) {
                if (i === taskArr.length-1) {
                    taskArr.pop()
                }
                else {
                    let newArr = taskArr.splice(0, i + 1)
                    newArr.pop()
                    taskArr = newArr.concat(taskArr)
                }
            }
        }
        localStorage.setItem('taskArr', JSON.stringify(taskArr))
        parent_taskDiv.remove()
    })
})

