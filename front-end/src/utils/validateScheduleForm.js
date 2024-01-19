
export default (values) => {
    let errors = {};
    const time_value = values.time.trim();
    const days_value = values.days.trim();
    const hint_value = values.hint.trim();

    ! time_value
        && (errors.time = 'Time Required');

    ! days_value
        ? errors.days = 'Days Required'
        : days_value < 1 || days_value > 100 
            && (errors.days = 'Days must be 1 and 100')

    ! hint_value
        ? errors.hint = 'Hint Required'
        : hint_value.length < 1 || hint_value.length > 100 
            && (errors.hint = 'Hint must be 1 and 100 characters')

    return errors;
}
