let boutonLancerTimer = document.getElementById("boutonPrincipal");
let boutonResetTimer = document.getElementById("boutonPrincipal");
boutonLancerTimer.textContent = "Débuter le timer";
boutonLancerTimer.addEventListener('click', tempsEcoule);

var minute = 25;
var seconde = 0;
document.getElementById("timer").innerHTML = minute+":"+seconde;

let intervalID;
let timeoutID;



/**
 * Cette version ne devrait pas être définitive, 
 * il serait peut-être judicieux de récupérer les minutes et secondes écoulées depuis la date 
 */
function timerTravail(){
    
    seconde=0;
    minute=25;
    timeoutID= setTimeout(timerRepos,minute*60*60*1000)
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

function timerRepos(){
    seconde=0;
    minute=5;
    timeoutID= setTimeout(timerTravail,minute*60*60*1000)
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



function tempsEcoule(){
    
    boutonResetTimer.textContent = "Reset le timer";
    boutonLancerTimer.removeEventListener('click', tempsEcoule);
    boutonResetTimer.addEventListener('click', stopTempsEcoule);

    timerTravail();
    
     
    //Mettre une alerte en plus ? Une boucle automatique ?
}

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
