import { emailVerification, logIn, signInWithGoogle, sigUpWithEmail } from "../firebase/firestore-auth";

export const Welcome = (onNavigate) => {
    const section = document.createElement("section");
    const logo = document.createElement("img");
    const labelEmail = document.createElement("label");
    const inputEmail = document.createElement("input");
    const labelPassword = document.createElement("label");
    const inputPassword = document.createElement("input");
    const divButtons = document.createElement("div");
    const buttonLogin = document.createElement("button");
    const buttonSignup = document.createElement("button");
    const buttonGoogle = document.createElement("button");

    labelEmail.textContent = "E-mail";
    labelPassword.textContent = "Password";
    buttonLogin.textContent = "Log In";
    buttonSignup.textContent = "Sign Up";
    buttonGoogle.textContent = "Continue with Google";

    section.setAttribute("class","container")
    logo.setAttribute("src", "media/logo-todo.png");
    logo.setAttribute("alt", "logo");
    labelEmail.setAttribute("for","email");
    inputEmail.setAttribute("name","email");
    inputEmail.setAttribute("type","email");
    inputEmail.setAttribute("required","required");
    labelPassword.setAttribute("for","password");
    inputPassword.setAttribute("name","password");
    inputPassword.setAttribute("type","password");
    inputPassword.setAttribute("required","required");
    buttonLogin.setAttribute("type","submit");
    buttonLogin.setAttribute("class","smallButton");
    buttonSignup.setAttribute("type","submit");
    buttonSignup.setAttribute("class","smallButton");
    buttonGoogle.setAttribute("type","button")
    buttonGoogle.setAttribute("class","googleButton")

    buttonLogin.addEventListener("click", () => {
        const email = inputEmail.value;
        const password = inputPassword.value;

        logIn(email, password)
            .then((result) => {
                const user = result.user;
                if(user.emailVerified === false) {
                    alert("Verifica tu email, revisa tu bandeja de entrada.")
                } else {
                    console.log("Email verificado");
                    onNavigate("/home");
                }
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
                alert(error.message);
            })
    });

    buttonSignup.addEventListener("click", () => {
        const email = inputEmail.value;
        const password = inputPassword.value;

        sigUpWithEmail(email, password)
            .then(() => {
                alert("Verifica tu correo y luego inicia sesión.");
                emailVerification();
            }).catch((error) => {
                alert(error.code);
            })
    });

    buttonGoogle.addEventListener("click", () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(`El usuario logueado es ${user.displayName}.`);
                onNavigate("/home");
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })
    });

    divButtons.append(buttonLogin, buttonSignup);
    section.append(logo, labelEmail, inputEmail, labelPassword, inputPassword, divButtons, buttonGoogle);
    return section;
};
