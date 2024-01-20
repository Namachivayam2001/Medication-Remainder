export default (values) => {
    
    let errors = {};

    const email_value = values.email.trim();
    const password_value = values.password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/;

    /* validate email address */
    ! email_value
        ? errors.email = 'Email Address Required'
        : !emailRegex.test(email_value)
            && (errors.email = 'invalid Email Address')

    /* validate password */
    ! password_value
        ? errors.password = 'password Required'
        : !passwordRegex.test(password_value)
            && (errors.password = 'use A-a-@-1 and atleast 8 character')

    return errors;
}