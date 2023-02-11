// para validad inputs del formulario

export const inputComplet = {
    email: false,
    password: false,
};

const expresions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,16}$/,
};

const validateInput = (expresion, input, name) => {
    if (expresion.test(input.value)) {
        document.getElementById(`error-${name}`).classList.replace("error", "hide");
        inputComplet[name] = true;
    } else {
        document.getElementById(`error-${name}`).classList.replace("hide", "error");
        inputComplet[name] = true;
    }
};

export const validateForm = (e) => {
    switch (e.target.name) {
        case "email":
            validateInput(expresions.email, e.target, 'email')
            break;
        case "password":
            validateInput(expresions.password, e.target, 'password')
            break;
        default:
            break;
    }
};