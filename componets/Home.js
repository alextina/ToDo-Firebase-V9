import { logOut } from "../firebase/firestore-auth";

export const Home = (onNavigate) => {
    const section = document.createElement("section");
    const buttonLogOut = document.createElement("button");
    buttonLogOut.setAttribute("class","smallButton");
    buttonLogOut.textContent = "Sign Out";

    buttonLogOut.addEventListener("click", () => {
        logOut()
            .then(() => {
                console.log(`El usuario cerró sesión`);
                onNavigate("/");
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })
    });

    section.append(buttonLogOut);
    return section;
};
