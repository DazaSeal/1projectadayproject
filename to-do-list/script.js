// what the user put in the input box will be added to the list

var inputBox = document.getElementById("input-box");
var add = document.getElementsByTagName("button")[0];
var list = document.getElementById("list");

add.addEventListener("click", function() {
    if (inputBox.value != "") {
        if (inputBox.value.split(" ").length < 2) {
            alert("Please enter a task with more than one word");
            return;
        }    
        var li = document.createElement("li");
        li.textContent = inputBox.value;
        list.appendChild(li);
        inputBox.value = "";
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        li.appendChild(deleteButton);
        deleteButton.addEventListener("click", function() {
            li.remove();
        })
    }
    else {
        alert("Please enter a task");
    }
});


list.addEventListener("click", function(e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("done");
    }
});

