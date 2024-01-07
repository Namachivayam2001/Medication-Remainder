const form = document.getElementById('form');
const userDays = document.getElementById('userDays');
const hint = document.getElementById('hint');
const dayerr = document.getElementById('dayerr');
const hinterr = document.getElementById('hinterr');

form.addEventListener('submit', (e) => {
    if(!formValid()){
        e.preventDefault();
    }
})

const formValid = () => {
    if(userDayValidation()){
        if(hintValidation()){
            console.log('hi')
            return true;
        }
    }
    return false;
}

const userDayValidation = () => {
    if(userDays.value <= 100 && userDays.value > 0){
        userDays.style = "border: 1px solid #ccc"
        dayerr.textContent = "";
        return true;
    }
    dayerr.textContent = "days must be 1 to 100";
    userDays.style = "border: 1px solid red" 
    return false;
}

const hintValidation = () => {
    hintValue = hint.value;
    if(hintValue.length > 0 && hintValue.length <= 100){
        hint.style = "border: 1px solid #ccc"
        hinterr.textContent = "";
        return true;
    }
    hinterr.textContent = "char must be 1 to 100";
    hinterr.style = "margin-bottom: -14px"
    hint.style = "border: 1px solid red"
    return false;
}