export default (values) => {
    let errors = {};
    const email_value = values.email.trim();
    const password_value = values.password.trim();
    console.log(email_value);
    console.log(password_value);
    return errors;
}