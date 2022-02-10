let button = document.getElementById("add-task-button"),
inputField = document.getElementById("input-task"),
svgElement = document.getElementById("cross"),
bigList = document.getElementById("task-list"),
taskCount = 0;
function createTask(svg, spanText, ul, id) {
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
    container.appendChild(input)
    container.appendChild(span);
    list.appendChild(container);
    button.appendChild(dupSvg);
    list.appendChild(button);
    ul.appendChild(list);
    button.addEventListener("click", function (){
        list.remove();
    })
    input.addEventListener("click", () => {
        if (input.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }
    })
}

inputField.addEventListener("focusin", function () {
    button.className = "selected";
})
inputField.addEventListener("focusout", function () {
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
            let idName = "cross" + taskCount;
            createTask(svgElement, value, bigList, taskCount, idName);
            taskCount ++;
            inputField.value ="";
            inputField.className = "";
            button.className = "";
        }})
