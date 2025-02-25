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
    node.setAttribute("readonly", "true");


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

export function tabFetchNewTask(newTask){

    const temp = createTask(...newTask);
    tab.dataList[tab.activeTab].push(temp);
    displayAppendTask(temp.node);
    console.table(tab.dataList[tab.activeTab]);

}

init();
