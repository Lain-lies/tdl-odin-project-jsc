import {displayShowAllTask, displayAppendTask} from "./display.js";
const tab = {
    
    activeTab : 0,
    defaultTabCount : 3,
    dataList : [[], [], []]

};

function createTask (name, description) {
    
    const node = document.createElement("div");

    const nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("readonly", "true");
    nameField.value = name;

    const descriptionField = document.createElement("input");
    descriptionField.setAttribute("type", "text");
    descriptionField.setAttribute("readonly", "true");
    descriptionField.value = description;

    node.appendChild(nameField);
    node.appendChild(descriptionField);

    return {name, description, node};
}

function tabFetchDom(){
    
    tab.parent = document.querySelector("nav");
    tab.buttonList = [...document.querySelectorAll("nav button:not(#add)")];
    tab.addButton = document.querySelector("#add");
    
    tabBindDefaults();
}

function tabBindDefaults(){
    
    tab.addButton.addEventListener("click", tabCreate);
    tab.buttonList.forEach(button => button.addEventListener("click", tabSwitch)); 

}

function tabSwitch(event){

    tab.activeTab = tab.buttonList.indexOf(event.target);
    displayShowAllTask(bundleNodes());
    console.log(`active tab : ${tab.activeTab}`);    
}

function tabCreate(){

    const newTab = document.createElement("button");
    newTab.textContent = "Sample";

    newTab.addEventListener("click", tabSwitch);
    tab.parent.appendChild(newTab);
    tab.buttonList.push(newTab);
    tab.dataList.push([]);

}

function bundleNodes(){

    return tab.dataList[tab.activeTab].map(task => task.node);

}

function init(){

    tabFetchDom();
}

function tabAddEditButtonToTask(task){

    let nameField, descriptionField;
    [nameField, descriptionField] = [...task.node.children];
    console.log(`nameField = ${nameField}`);
    console.log(`descField = ${descriptionField}`);

    let mode = 0;
    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.addEventListener("click", () => {
        
        if(!mode){
            
            mode = 1;
            editButton.textContent = "done";
            nameField.removeAttribute("readonly", "true");
            descriptionField.removeAttribute("readonly", "true");

    
        }else{

            mode = 0;
            editButton.textContent = "edit";
            nameField.setAttribute("readonly", "true");
            descriptionField.setAttribute("readonly", "true");
            task.name = nameField.value;
            task.description = descriptionField.value;
            console.table(tab.dataList[tab.activeTab]);

        }

    });

    task.node.appendChild(editButton);
}
export function tabFetchNewTask(newTask){

    const temp = createTask(...newTask);
    tabAddEditButtonToTask(temp);
    tab.dataList[tab.activeTab].push(temp);
    displayAppendTask(temp.node);
    console.table(tab.dataList[tab.activeTab]);

}

init();
