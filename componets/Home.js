import { auth, logOut } from "../firebase/auth";
import { saveTask, onGetTaks, deleteTask, getTask, updateTask } from "../firebase/firestore";

export const Home = (onNavigate) => {
    
    const sectionHome = document.createElement("section");
    const sectionMenu = document.createElement("section");
    let userEmail = document.createElement("h1");
    const buttonLogOut = document.createElement("button");
    const iconLogOut = document.createElement("i");
    const formTask = document.createElement("form");
    const inputTask = document.createElement("input");
    const buttonSave = document.createElement("button");
    const allTasks = document.createElement("section");

    sectionHome.className = "container home";
    sectionMenu.id = "sectionMenu";
    userEmail.innerHTML = "Hi, correo@electronico.com";
    iconLogOut.className = "fa-solid fa-right-from-bracket";
    buttonLogOut.append(iconLogOut);
    formTask.id = "formTask";
    inputTask.type = "text";
    inputTask.placeholder = "Write your task here...";
    buttonSave.type = "submit";
    buttonSave.textContent = "Save"
    allTasks.id = "allTasks"

    let editStatus = false;
    let id = "";

    onGetTaks((querySnapshot) => {
        let html = "";
        querySnapshot.forEach(doc => {
            const userUid = auth.currentUser.uid;
            const task = doc.data();
            const taskUserUid = task.userUid;
            const taskDate = task.date.toDate();
            const formattedDate = taskDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
            if ( userUid === taskUserUid ) {
                html += `
                <article>
                    <h3 class = "oneTask">${task.task}</h3>
                    <section class = "info">
                        <p class = "info">By ${task.userEmail} on ${formattedDate}.</p>
                        <button data-id="${doc.id}" class="fa-solid fa-pen-to-square"></button>
                        <button data-id="${doc.id}" class="fa-solid fa-trash"></button>          
                    </section>
                </article> 
                `;
            };
        });
        allTasks.innerHTML = html;

        console.log(auth.currentUser.email);
        userEmail.innerHTML = `Hi, ${auth.currentUser.displayName || auth.currentUser.email}`;
        
        const buttonsDelete = allTasks.querySelectorAll(".fa-trash");
        buttonsDelete.forEach((buttonDelete) => {
            buttonDelete.addEventListener("click", ({target: {dataset}}) => {
                confirm("Do you want to delete yoyr task?") ? deleteTask(dataset.id) : null;
            })
        });

        const buttonsEdit = allTasks.querySelectorAll(".fa-pen-to-square");
        buttonsEdit.forEach((buttonEdit) => {
            buttonEdit.addEventListener("click", async ({target: {dataset}}) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();

                inputTask.value = task.task;
                editStatus = true;
                id = doc.id; // dataset.id;
                buttonSave.textContent = "Update";
            })
        })
    });

    // evento al formulario => fx para la tarea es enviado
    formTask.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inputTask.value !== "") {
          const task = inputTask.value;

          if (!editStatus) {
            saveTask(task);
          } else {
            updateTask(id, {task});
            editStatus = false;
            buttonSave.textContent = "Save";
          }
        }
         // reseteando el formulario
        formTask.reset();
      });

    // boton de cerrar sesión
    buttonLogOut.addEventListener("click", () => {
        logOut()
            .then(() => {
                onNavigate("/");
            }).catch((error) => {
                console.log(error);
            })
    });

    sectionMenu.append(userEmail, buttonLogOut);
    formTask.append(inputTask, buttonSave);
    sectionHome.append(sectionMenu, formTask, allTasks);
    return sectionHome;
};
