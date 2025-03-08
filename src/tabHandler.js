import {displayShowAllTask, displayAppendTask, displayRemoveTask} from "./display.js";
import {dbFetchLoadCount, dbLoadAll, dbSync, dbSyncLoadCount} from "./storageHandler.js";

const tab = {
    
    activeTab : 0,
    dataList : [],
    nodeList : [],

};

function createTask (name, description, priority) {
    
    return {name, description, priority};

}

function createNode(task){
    
    const parent = document.createElement("div");

    const nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("readonly", "true");
    nameField.value = task.name;

    const descriptionField = document.createElement("textarea");
    descriptionField.setAttribute("readonly", "true");
    descriptionField.value = task.description;

    const priorityField = document.createElement("select");
    priorityField.options[0] = new Option("low", "0");
    priorityField.options[1] = new Option("medium", "1");
    priorityField.options[2] = new Option("high", "2");
    priorityField.selectedIndex = task.priority;
    priorityField.disabled = true;

    let mode = 0;
    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.addEventListener("click", () => {
        
        if(!mode){
            
            mode = 1;
            editButton.textContent = "done";
            nameField.removeAttribute("readonly", "true");
            descriptionField.removeAttribute("readonly", "true");
            priorityField.disabled = false;

        }else{

            mode = 0;
            editButton.textContent = "edit";
            nameField.setAttribute("readonly", "true");
            descriptionField.setAttribute("readonly", "true");
            priorityField.disabled = true;
            task.name = nameField.value;
            task.description = descriptionField.value;
            task.priority = priorityField.selectedIndex;
            console.table(tab.dataList[tab.activeTab]);

        }

        dbSync(`${tab.activeTab}`, tab.dataList[tab.activeTab]);

    });

    const expandButton = document.createElement("button");
    expandButton.textContent = "V";
    let expandMode = 0;
    expandButton.addEventListener("click", () => {
        
        if(!expandMode){
            
            parent.appendChild(descriptionField);
            expandMode = 1;

        }else{
            
            parent.removeChild(descriptionField);
            expandMode = 0;
        }
    });

    let index = tab.nodeList[tab.activeTab].length;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Del";
    
    deleteButton.addEventListener("click", () => {

        console.log(`index for deletion : ${index}`);

        displayRemoveTask(index);

        tab.dataList[tab.activeTab].splice(index, 1);
        tab.nodeList[tab.activeTab].splice(index, 1);

        console.log(tab.nodeList[tab.activeTab]);
        dbSync(`${tab.activeTab}`, tab.dataList[tab.activeTab]);
        
    });

    parent.appendChild(nameField);
    parent.appendChild(priorityField);
    parent.appendChild(expandButton);
    parent.appendChild(editButton);
    parent.append(deleteButton);
    parent.classList.add("task");

    return parent;

}

function tabFetchDom(){
    
    tab.parent = document.querySelector("#dynamic-tabs");
    tab.buttonList = [...document.querySelector("#default-tabs").children];
    tab.addButton = document.querySelector("#add");
    
    tabBindDefaults();
}

function tabBindDefaults(){
    
    tab.addButton.addEventListener("click", tabCreate);
    tab.buttonList.forEach(button => button.addEventListener("click", tabSwitch)); 

}

function tabSwitch(event){

    tab.activeTab = tab.buttonList.indexOf(event.target);
    displayShowAllTask(tab.nodeList[tab.activeTab]);
    console.log(`active tab : ${tab.activeTab}`);    
}

function tabCreate(){

    const newTab = document.createElement("button");
    newTab.textContent = "New Tab";
    newTab.classList.add("nav-tabs");
    newTab.addEventListener("click", tabSwitch);

    tab.parent.appendChild(newTab);
    tab.buttonList.push(newTab);
    tab.dataList.push([]);
    tab.nodeList.push([]);

    dbSyncLoadCount()

}

function tabCreateINIT(){

    const newTab = document.createElement("button");
    newTab.textContent = "New Tab";
    newTab.classList.add("nav-tabs");
    newTab.addEventListener("click", tabSwitch);

    tab.parent.appendChild(newTab);
    tab.buttonList.push(newTab);
    tab.dataList.push([]);
    tab.nodeList.push([]);

}

export function tabINIT(){
    
    tabFetchDom();

    const load = dbFetchLoadCount();
    console.log(load)

    for(let i = 0; i < load; i++){

        const content = dbLoadAll(`${i}`);
        console.log(load);

        if(i < 3){

            if(content === null){

                tab.dataList.push([]);
                tab.nodeList.push([]);
                continue;
            
            }else{

                tab.dataList.push(content);
                tab.nodeList.push([]);
                content.forEach(task => tab.nodeList[i].push(createNode(task)));
            }

        }else{

            tabCreateINIT();
            if(content === null) continue;
            content.forEach(task => tab.nodeList[i].push(createNode(task)));

        }
    
    }

    console.log(tab.dataList)
    console.log(tab.nodeList);
    
    if(tab.dataList[0] !== undefined || tab.dataList[0].length !== 0){

        displayShowAllTask(tab.nodeList[tab.activeTab]);

    }

}

export function tabFetchNewTask(newTask){

    const temp = createTask(...newTask);
    console.log(temp);
    const tempNode = createNode(temp);

    tab.dataList[tab.activeTab].push(temp);
    tab.nodeList[tab.activeTab].push(tempNode);

    displayAppendTask(tempNode);

    console.table(tab.dataList[tab.activeTab]);

    dbSync(tab.activeTab, tab.dataList[tab.activeTab]);

}