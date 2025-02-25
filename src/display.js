const display = {
    content : [],
};

function displayFetchDOM(){
    
    display.parent = document.querySelector("#display");

}

export function displayShowAllTask(DOMList){
    console.log(`current content = ${display.content}`);

    displayClearAll();
    DOMList.forEach(element => {
        
        display.parent.appendChild(element);
        display.content.push(element);
    });

}

export function displayAppendTask(task){
    console.log(`current content = ${display.content}`);

    display.parent.appendChild(task);
    display.content.push(task);

}

function displayClearAll(){

    console.log(`current content = ${display.content}`);

    display.content.forEach(element => display.parent.removeChild(element));
    display.content = [];

}

function displayINIT(){

    displayFetchDOM();
}

displayINIT();
