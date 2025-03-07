const display = {
    content : [],
};

function displayFetchDOM(){
    
    display.parent = document.querySelector("#display");

}

export function displayShowAllTask(DOMList){

    displayClearAll();

    if(DOMList === undefined || DOMList.length === 0){
        
        return;
    }

    DOMList.forEach(element => {
        
        display.parent.appendChild(element);
        display.content.push(element);
        
    });

}

export function displayAppendTask(task){

    display.parent.appendChild(task);
    display.content.push(task);

}

export function displayRemoveTask(index){
    
    display.parent.removeChild(display.content[index]);
    display.content.splice(index, 1);
    displayUpdate();

}

function displayUpdate(){
    
    display.content.forEach(element => {
        
        display.parent.appendChild(element);
        
    });    
}
function displayClearAll(){

    display.content.forEach(element => display.parent.removeChild(element));
    display.content = [];

}

export function displayINIT(){

    displayFetchDOM();
}

