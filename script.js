let boutonPrincipal = document.getElementById("boutonPrincipal");
boutonPrincipal.textContent = "Débuter le timer";

var minute = 25;
var seconde = 0;
document.getElementById("timer").innerHTML = minute+":"+seconde;


/**
 * Cette version ne devrait pas être définitive, 
 * il serait peut-être judicieux de récupérer les minutes et secondes écoulées depuis la date 
 */
function timerTravail(){
    setInterval(function(){
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
    setInterval(function(){
        if(seconde==0){
            seconde=59;
            minute=minute-1;
        }else{
            seconde=seconde-1;
        }
        document.getElementById("timer").innerHTML = minute+":"+seconde;
    }, 1000)
}

boutonPrincipal.addEventListener('click', tempsEcoule);

function tempsEcoule(){
    timerTravail();
    let tempsRestant = setTimeout(timerRepos,minute*60*60*1000) //Mettre une alerte en plus ?
}
