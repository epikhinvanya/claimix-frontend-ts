interface FormDataAuth {
    username: string,
    password: string
}

interface FormDataRegister {
    username: string,
    email: string,
    password: string,
    password2: string,
    first_name: string,
    last_name: string,
}

interface FormDataErrors {
    username?: boolean,
    email?: boolean,
    password?: boolean,
    password2?: boolean,
}