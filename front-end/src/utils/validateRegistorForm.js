export default (values) => {
    let errors = {};
    const first_name_value = values.first_name.trim();
    const last_name_value = values.last_name.trim();
    const user_id_value = values.user_id.trim();
    const dob_value = values.dob.trim();
    const mobile_number_value = values.mobile_number.trim();
    const email_value = values.email.trim();
    const guardian_email_value = values.guardian_email.trim();
    const password_value = values.password.trim();
    const confirm_password_value = values.confirm_password.trim();

    const nameRegex = /^[A-Za-z]+$/;
    const userIdRegex = /^[A-Za-z][A-Za-z0-9]{7,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/;

    const dob = new Date(dob_value);
    const currentDate = new Date();
    const minDate = new Date(
        currentDate.getFullYear() - 100, 
        currentDate.getMonth(), 
        currentDate.getDate()
    );
    const maxDate = new Date(
        currentDate.getFullYear() - 16, 
        currentDate.getMonth(), 
        currentDate.getDate()
    );

    const numericMobileNumber = mobile_number_value.replace(/\D/g, '');

    /* validate first name */
    ! first_name_value
        ? errors.first_name = 'First Name Required'
        : !nameRegex.test(first_name_value)
            && (errors.first_name = 'Use only alphabets')

    /* validate last name */
    ! last_name_value
        ? errors.last_name = 'Last Name Required'
        : !nameRegex.test(last_name_value)
            && (errors.last_name = 'Use only alphabets')

    /* validate userId */
    ! user_id_value
        ? errors.user_id = 'User ID Required'
        : !userIdRegex.test(user_id_value)
            && (errors.user_id = 'use minimu 7 char or userId already exist')

    /* validate date of bearth */
    ! dob_value
        ? errors.dob = 'DOB Required'
        : !(dob >= minDate && dob <= maxDate)
            && (errors.dob = 'Range of age must be 16 - 100')

    /* validate monile number */
    ! mobile_number_value
        ? errors.mobile_number = 'Mobile Number Required'
        : !(numericMobileNumber.length === 10)
            && (errors.mobile_number = 'invalid Mobile number')

    /* validate email address */
    ! email_value
        ? errors.email = 'Email Address Required'
        : !emailRegex.test(email_value)
            && (errors.email = 'invalid Email Address')

    /* validate guardian email address */
    if(!guardian_email_value){
        errors.guardian_email = 'Email Address Required';
    } else if(!emailRegex.test(guardian_email_value)){
        errors.guardian_email = 'invalid Email Address';
    } else if(guardian_email_value === email_value){
        errors.guardian_email = 'Email  and Guardian email must be different';
    }

    /* validate password */
    ! password_value
        ? errors.password = 'password Required'
        : !passwordRegex.test(password_value)
            && (errors.password = 'use A-a-@-1 and atleast 8 character')

    /* validate guardian email address */
    ! confirm_password_value
        ? errors.confirm_password = 'Confirm Password Required'
        : !(password_value === confirm_password_value)
            && (errors.confirm_password = 'Confirm Password and Password are not same')

    return errors;
}