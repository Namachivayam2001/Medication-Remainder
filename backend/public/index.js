const num = document.getElementById("num");
const button = document.getElementById("button");
const error = document.getElementById("error");
const score = document.getElementById("score");
const count = document.getElementById("count");

button.addEventListener("click", () => {
    checkNumber();
});

var counter = 0;

const checkNumber = () => { 
    const rand = Math.floor(Math.random() * 10) + 1;
    console.log(rand);
    if(num.value < 1 || num.value > 10){
        error.innerHTML = "num be 1 to 10";
        error.style = "color: red; margin-left: -100px";
        score.style = "margin-top: 2px";
        count.innerHTML = counter;
    }else{
        score.style = "margin-top: 20px";
        if(rand == num.value){
            counter++;
        }else{
            counter--;
        }
        error.innerHTML = "rand no: " + rand;
        error.style = "color: green; margin-left: -130px; font-style: italic";
        score.style = "margin-top: 2px";
        count.innerHTML = counter;
    }
}