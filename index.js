let button = document.getElementById("add-task-button"),
    inputField = document.getElementById("input-task"),
    svgElement = document.getElementById("cross"),
    bigList = document.getElementById("task-list"),
    taskCount = 0,
    taskList = {};
function ObjectLength( object ) {
    let length = 0;
    for( let key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};
function retrieveData() {
    let data =  JSON.parse(localStorage.getItem("tasks")) || {};
    for (let i = 0; i < ObjectLength(data); i++) {
        createTask(svgElement, Object.keys(data)[i], bigList, taskCount, Object.values(data)[i]);
    }
    return data;
};

taskList = retrieveData();
function createTask(svg, spanText, ul, id, line) {
    let list =  document.createElement("li"),
        container = document.createElement("div"),
        button = document.createElement("button"),
        input = document.createElement("input"),
        span = document.createElement("span"),
    dupSvg = svg.cloneNode(true);
    input.type = "checkbox";
    span.className = "task";
    span.innerText = spanText;
    button.className = "delete-btn";
    dupSvg.id = id;
    id++;
    container.appendChild(input)
    container.appendChild(span);
    list.appendChild(container);
    button.appendChild(dupSvg);
    list.appendChild(button);
    ul.appendChild(list);
    button.addEventListener("click", function (){
        delete taskList[spanText];
        localStorage.setItem("tasks", JSON.stringify(taskList));
        list.remove();
    })
    if (line) {
        taskList[spanText] = true;
        span.style.textDecoration = "line-through";
        input.checked = true;
    } else {
        taskList[spanText] = false;
        span.style.textDecoration = "none";
        input.checked = false;
    }
    input.addEventListener("click", () => {
        if (input.checked) {
            span.style.textDecoration = "line-through";
            taskList[spanText] = true;
            localStorage.setItem("tasks", JSON.stringify(taskList));

        } else {
            span.style.textDecoration = "none";
            taskList[spanText] = false;
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }
    })
}

inputField.addEventListener("focusin", () => {
    button.className = "selected";
})
inputField.addEventListener("focusout",() => {
    if(inputField.value == "") {
        button.className = "";
        inputField.className = "";
    } else {
        inputField.className = "selected";
    }
})
    button.addEventListener("click", function () {
        let value = inputField.value;
        if(value != "") {
            let idName = "cross " + String(taskCount);
            createTask(svgElement, value, bigList, idName);
            inputField.value ="";
            inputField.className = "";
            button.className = "";
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }})
        document.addEventListener("keydown", (event) => {
            let name = event.key;
            if (name === "Enter"){
                button.click();
            }
        });