let numberx = "0";
let numbery = "0";
let operator = "";
let result = "";
let theme = 'assets/css/theme-first.css'
let operanding = false;
const operators = ["+","-","x","RESET","DEL","=","/"];

window.onload = function () {

    document.querySelector(".view_result__span").textContent = "0";

    if(window.localStorage.getItem("theme")){
        const gettheme = JSON.parse(window.localStorage.getItem("theme"));
        theme = gettheme.css;
        document.getElementById(gettheme.check).checked = true;
    };

    document.getElementById('theme-selected').href = theme;
    
    document.querySelector(".radio-wrapper__options").addEventListener('click',()=>{
        if (document.getElementById('theme-1').checked){
            window.localStorage.setItem("theme",JSON.stringify({css: "assets/css/theme-first.css", check: "theme-1"}));
            document.getElementById('theme-selected').href = 'assets/css/theme-first.css';
        }
        if (document.getElementById('theme-2').checked){
            window.localStorage.setItem("theme",JSON.stringify({css: "assets/css/theme-second.css", check: "theme-2"}));
            document.getElementById('theme-selected').href = 'assets/css/theme-second.css';
        }
        if (document.getElementById('theme-3').checked){
            window.localStorage.setItem("theme",JSON.stringify({css: "assets/css/theme-third.css", check: "theme-3"}));
            document.getElementById('theme-selected').href = 'assets/css/theme-third.css';
        }
    });

    const buttons = document.querySelectorAll(".body-button");
    
    buttons.forEach((element)=>{
        element.addEventListener('click',()=>{
            operarElement(element.value);
        });
    })
}

function operarElement(value){
    
    if(!operators.includes(value)){
        if(operanding){
            if(numbery.length < 14){
                if(numbery !=="0"){
                    numbery = numbery + value;
                    document.querySelector(".view_result__span").textContent = numbery;
                }
                else{
                    numbery = value;
                    document.querySelector(".view_result__span").textContent = numbery;
                    }
                }
        }
        else{
            if(numberx.length < 14){
            if(numberx !=="0"){
                numberx = numberx + value;
                document.querySelector(".view_result__span").textContent = numberx;
            }
            else{
                numberx = value;
                document.querySelector(".view_result__span").textContent = numberx;
                }
            }
        }
    }
    if(operators.includes(value)){
        switch(value){
            case "RESET":
                numberx = "";
                document.querySelector(".view_result__span").style.fontSize = "32px";
                document.querySelector(".view_result__span").textContent = "0";
                operanding = false;
                break;
            case "DEL":
                if(operanding){
                    if(numbery.length !==0){
                        numbery  = Array.from(numbery);
                        numbery.pop();
                        numbery = numbery.join('');
                        document.querySelector(".view_result__span").textContent = numbery;
                    }
                    if (numbery.length === 0){
                        numbery = "0";
                        document.querySelector(".view_result__span").textContent = "0";
                    }
                }
                else{
                    if(numberx.length !==0){
                        numberx  = Array.from(numberx);
                        numberx.pop();
                        numberx = numberx.join('');
                        document.querySelector(".view_result__span").textContent = numberx;
                    }
                    if (numberx.length === 0){
                        numberx = "0";
                        document.querySelector(".view_result__span").textContent = "0";
                    }
                }
                break;
            case "+":
            case "/": 
            case "-":
                operator = value;
                operanding = true;
                //console.log(operanding + " " + operator);
                break;
            case "x":
                operator="*"
                operanding = true;
                // console.log(operanding + " " + operator);
                break;
            case "=":
                operanding = false;
                //console.log(numberx + operator + numbery);
                result = eval(numberx+operator+numbery);
                if(result === Infinity || isNaN(result)){
                    document.querySelector(".view_result__span").textContent = "Error";
                    numberx = "0";
                    numbery = "0";
                }
                else{
                    if(result.toString().length > 14){
                        document.querySelector(".view_result__span").style.fontSize = "25px";
                        document.querySelector(".view_result__span").textContent = result;
                        numberx = result.toString();
                        numbery = "0";
                        if(result.toString().length>20){
                            document.querySelector(".view_result__span").style.fontSize = "23px";
                        }
                    }
                    else{
                        document.querySelector(".view_result__span").textContent = result;
                        document.querySelector(".view_result__span").style.fontSize = "32px";
                        numberx = result.toString();
                        numbery = "0";
                    }
                }
                break;
        }
    }
}
