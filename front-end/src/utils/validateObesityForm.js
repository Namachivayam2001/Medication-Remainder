export default (values) => {

    let errors = {};
    const Height = values.Height.trim();
    const Weight = values.Weight.trim();
    const FCVC = values.FCVC.trim();
    const NCP = values.NCP.trim();
    const FAF = values.FAF.trim();
    const CH2O = values.CH2O.trim();
    const TUE = values.TUE.trim();
    const family_history_with_overweight = values.family_history_with_overweight.trim();
    const FAVC = values.FAVC.trim();
    const SCC = values.SCC.trim();
    const CALC = values.CALC.trim();
    const CAEC = values.CAEC.trim();
    const MTRANS = values.MTRANS.trim();
    const SMOKE = values.SMOKE.trim();
    const Gender = values.Gender.trim();
    
    ! Height
        ? errors.Height = 'height required'
        : !(Height <= 3 && Height >= 0.5)
            && (errors.Height = 'Range of Height must be 0.5 to 3 m')

    ! Weight
        ? errors.Weight = 'weight required'
        : !(Weight <= 300 && Weight >= 15)
            && (errors.Weight = 'Range of weight must be 15 to 300 Kg')
            
    ! FCVC
        ? errors.FCVC = 'FCVC required'
        : !(FCVC <= 10 && FCVC >= 0)
            && (errors.FCVC = 'vegetables intake must be 0 to 10 Kg')
            
    ! NCP
        ? errors.NCP = 'NCP required'
        : !(NCP <= 4 && NCP >= 1)
            && (errors.NCP = 'Range of main meal must be 1 to 4 times')

    ! FAF
        ? errors.FAF = 'FAF required'
        : !(FAF <= 24 && FAF >= 0)
            && (errors.FAF = 'Range of physical activity must be 0 to 24 hours')

    ! CH2O
        ? errors.CH2O = 'CH2O required'
        : !(CH2O <= 10 && CH2O >= 1)
            && (errors.CH2O = 'Range of water consumption must be 1 to 10 litters')

    ! TUE
        ? errors.TUE = 'TUE required'
        : !(TUE <= 24 && TUE >= 0)
            && (errors.TUE = 'Range of using technology must be 0 to 24 hours')

    family_history_with_overweight === 'Select...'
        && (errors.family_history_with_overweight = 'Select YES or NO')

    ! FAVC
        && (errors.FAVC = 'Select YES or NO')

    ! CALC
        && (errors.CALC = 'Select YES or NO')

    ! SCC
        && (errors.SCC = 'Select YES or NO')

    ! CAEC
        && (errors.CAEC = 'Select YES or NO')

    ! MTRANS
        && (errors.MTRANS = 'Select YES or NO')

    ! SMOKE
        && (errors.SMOKE = 'Select YES or NO')  

    ! Gender
        && (errors.Gender = 'Select Male or Female')      

    return errors;

}

