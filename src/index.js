import "./styles.css";
import { taskAdderINIT } from "./addTask.js";
import { displayINIT } from "./display.js"; 
import { tabINIT } from "./tabHandler.js";
import { dbINIT } from "./storageHandler.js";

const clear = document.querySelector("#clear").addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
    
});

taskAdderINIT();
dbINIT();
displayINIT();
tabINIT();

