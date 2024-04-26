export default (input) => {
    let err = {}
    const Pregnancie = input.Pregnancies;
    const Glucose = input.Glucose
    const BloodPressure = input.BloodPressure
    const SkinThickness = input.SkinThickness
    const Insulin = input.Insulin
    const BMI = input.BMI
    const DiabetesPedigreeFunction = input.DiabetesPedigreeFunction

    !Pregnancie 
        ? err.Pregnancie = 'Pregnencienot Required'
        : (Pregnancie < 0 || Pregnancie > 20)
            && (err.Pregnancie = 'Pregnancie must be inbetween 0 to 20')

    !Glucose
        ? err.Glucose = 'Glucose Required'
        : (Glucose < 1 || Glucose > 2600)
            && (err.Glucose = 'Glucose must be inbetween 1 to 2600')

    !BloodPressure
        ? err.BloodPressure = 'BloodPressure Required'
        : (BloodPressure < 0 || BloodPressure > 370)
            && (err.BloodPressure = 'BloodPressure must be inbetween 1 to 370')

    !SkinThickness
        ? err.SkinThickness = 'SkinThickness Required'
        : (SkinThickness <= 0 || SkinThickness > 100)
            && (err.SkinThickness = 'SkinThickness must be inbetween 1 to 100')

    !Insulin
        ? err.Insulin = 'Insulin Required'
        : (Insulin <= 0 || Insulin > 900)
            && (err.Insulin = 'Insulin must be inbetween 1 to 900')  
            
    !BMI 
        ? err.BMI = 'BMI Required'
        : (BMI <= 0 || BMI > 1500)
            && (err.BMI = 'Insulin must be inbetween 1 to 1500')

    !DiabetesPedigreeFunction
        ? err.DiabetesPedigreeFunction = 'DiabetesPedigreeFunction Required'
        : (DiabetesPedigreeFunction < 0 || DiabetesPedigreeFunction > 2.5)
            && (err.DiabetesPedigreeFunction = 'Insulin must be inbetween 0 to 2.5')

    return err;
}