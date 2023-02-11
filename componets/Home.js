import { logOut } from "../firebase/auth";
import { saveTask, getTasks } from "../firebase/firestore";

export const Home = (onNavigate) => {
    
    const sectionHome = document.createElement("section");
    const divMenu = document.createElement("div");
    const buttonLogOut = document.createElement("button");
    const formTask = document.createElement("form");
    const labelTask = document.createElement("label");
    const inputTask = document.createElement("input");
    const divAllTasks = document.createElement("button");
    const divAllTask = document.createElement("div");

    divMenu.id = "divMenu";
    buttonLogOut.className = "smallButton";
    buttonLogOut.textContent = "Sign Out";
    formTask.id = "formTask";
    labelTask.textContent = "Task:";
    labelTask.htmlFor = "task";
    inputTask.className = "task";
    inputTask.type = "text";
    inputTask.className = "input-task";
    inputTask.placeholder = "Buy cats food...";
    divAllTasks.type = "submit";
    divAllTasks.textContent = "Save"
    divAllTask.id = "divAllTasks"
    
    let html = "";
    function getData () {
        getTasks()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    // console.log(doc.data());
                    const task = doc.data();
                    const taskDate = task.date.toDate();
                    const formattedDate = taskDate.toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit"
                    });
                    html += `
                    <div>
                    <p class= "date">Tarea publicada el ${formattedDate}.</p>
                    <p class= "oneTask">${task.task}</p>
                    <p class= "userEmail">${task.userEmail}</p>
                    </div> 
                    `
                })
                divAllTask.innerHTML = html;
            }).catch((error) => {
                alert(error)
            })
    }
    getData();

    // boton de cerrar sesión
    buttonLogOut.addEventListener("click", () => {
        logOut()
            .then(() => {
                onNavigate("/");
            }).catch((error) => {
                alert(error)
            })
    });

    // evento al formulario => fx para la tarea es enviado
    formTask.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inputTask.value !== "") {
          const task = inputTask.value;
          saveTask(task);
        }
         // reseteando el formulario
        formTask.reset();
      });

    divMenu.append(buttonLogOut);
    formTask.append(labelTask, inputTask, divAllTasks);
    sectionHome.append(divMenu, formTask, divAllTask);
    return sectionHome;
};
