//Les deux variables sont liées au même bouton mais sont utilisées pour faire la différence entre deux comportements, la troisième est le titre
let boutonLancerTimer = document.getElementById("boutonPrincipal");
let boutonResetTimer = document.getElementById("boutonPrincipal");
let titreIndication;

//Cette variable contient les paramètres rentrés par l'utilisateur 
const params = new URLSearchParams(window.location.search);

boutonLancerTimer.textContent = "Débuter le timer";

//La fonction tempsEcoule permet de lancer à la fois les fonctions d'écoulement du temps et la transformation du bouton
boutonLancerTimer.addEventListener('click', tempsEcoule);

var minute;
var seconde;
if(params.has("minutesUtilisateurTravail")){
    minute=params.get("minutesUtilisateurTravail");
    seconde= params.get("secondesUtilisateurTravail")
}else{
    seconde=0;
    minute=25;
}


document.getElementById("timer").innerHTML = minute+":"+seconde;

let intervalID;
let timeoutID;

/*
* Gère le timer de "minutesUtilisateurTravail" minutes puis appele timerRepos
* @see timerRepos 
*/
function timerTravail(){

    clearTimeout(timeoutID);
    clearInterval(intervalID);
    titreIndication = document.getElementById("indicationPeriode");
    titreIndication.innerHTML = "Il est temps de travailler";

    if(params.has("minutesUtilisateurTravail")){
        minute=params.get("minutesUtilisateurTravail");
        seconde= params.get("secondesUtilisateurTravail")
    }else{
        seconde=0;
        minute=25;
    }
    timeoutID= setTimeout(timerRepos,minute*60*1000+seconde*1000)
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
* Gère le timer de "minutesUtilisateurRepos" minutes puis appelle timerTravail
* @see timerTravail 
*/
function timerRepos(){

    clearTimeout(timeoutID);
    clearInterval(intervalID);
    titreIndication = document.getElementById("indicationPeriode");
    titreIndication.innerHTML = "Il est temps de se reposer";

    if(params.has("minutesUtilisateurRepos")){
        minute=params.get("minutesUtilisateurRepos");
        seconde= params.get("secondesUtilisateurRepos")
    }else{
        seconde=0;
        minute=5;
    }
    

    timeoutID= setTimeout(timerTravail,minute*60*1000+seconde*1000);
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
* Appelle les fonctions clear pour stopper le timer et change la fonctionnalité du bouton
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

