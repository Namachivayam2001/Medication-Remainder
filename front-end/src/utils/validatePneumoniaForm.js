const validatePneumoniaForm = (file) => {
    return !file
        ? 'Please select a file'
        : file.size > 1024 * 1024
            ? "select a file less then 1 MB"
            : null
}

export default validatePneumoniaForm;