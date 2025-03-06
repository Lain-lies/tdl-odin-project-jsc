import "./styles.css";
import { taskAdderINIT } from "./addTask.js";
import { displayINIT } from "./display.js"; 
import { tabINIT } from "./tabHandler.js";
import { dbINIT } from "./storageHandler.js";

taskAdderINIT();
dbINIT();
displayINIT();
tabINIT();

