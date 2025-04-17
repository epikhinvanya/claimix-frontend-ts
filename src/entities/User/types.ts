interface FormDataAuth {
    username: string,
    email: string,
    password: string
}

interface FormDataRegister {
    username: string,
    email: string,
    password: string,
    password2: string,
}

interface FormDataErrors {
    username?: boolean,
    email?: boolean,
    password?: boolean,
    password2?: boolean,
}