//Les deux variables sont liées au même bouton mais sont utilisées pour faire la différence entre deux comportements
let boutonLancerTimer = document.getElementById("boutonPrincipal");
let boutonResetTimer = document.getElementById("boutonPrincipal");

boutonLancerTimer.textContent = "Débuter le timer";

//La fonction tempsEcoule permet de lancer à la fois les fonctions d'écoulement du temps et la transformation du bouton
boutonLancerTimer.addEventListener('click', tempsEcoule);

var minute = 25;
var seconde = 0;

document.getElementById("timer").innerHTML = minute+":"+seconde;

let intervalID;
let timeoutID;

/*
* Gère le timer de 25 minutes puis appele timerRepos
* @see timerRepos 
*/
function timerTravail(){
    
    seconde=0;
    minute=25;
    timeoutID= setTimeout(timerRepos,25*60*1000)
    intervalID = setInterval(function(){
        if(seconde==0){
            seconde=59;
            minute=minute-1;
        }else{
            seconde=seconde-1;
        }
        document.getElementById("timer").innerHTML = minute+":"+seconde;
    }, 1000)
}

/*
* Gère le timer de 5 minutes puis appelle timerTravail
* @see timerTravail 
*/
function timerRepos(){
    seconde=0;
    minute=5;
    timeoutID= setTimeout(timerTravail,5*60*1000)
    intervalID = setInterval(function(){
        if(seconde==0){
            seconde=59;
            minute=minute-1;
        }else{
            seconde=seconde-1;
        }
        document.getElementById("timer").innerHTML = minute+":"+seconde;
    }, 1000)
}


/*
*Transforme le bouton et appelle timerTravail pour lancer la boucle
*/
function tempsEcoule(){
    
    boutonResetTimer.textContent = "Reset le timer";
    boutonLancerTimer.removeEventListener('click', tempsEcoule);
    boutonResetTimer.addEventListener('click', stopTempsEcoule);

    timerTravail();
    
     
}

/*
* Appelle les fonctions clear pour stopper le timer
*/

function stopTempsEcoule(){
    clearTimeout(timeoutID);
    clearInterval(intervalID);

    minute=25;
    seconde=0;
    
    document.getElementById("timer").innerHTML = minute+":"+seconde;
    boutonLancerTimer.textContent = "Débuter le timer";
    boutonResetTimer.removeEventListener('click', stopTempsEcoule);
    boutonLancerTimer.addEventListener('click', tempsEcoule);
}
