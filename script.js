//Les deux variables sont liées au même bouton mais sont utilisées pour faire la différence entre deux comportements
let boutonLancerTimer = document.getElementById("boutonPrincipal");
let boutonResetTimer = document.getElementById("boutonPrincipal");

//Ces variables correspondent aux mots "Travail" et "Repos" présents sous le titre
let indicationTravail = document.getElementById("indicationTravail");
let indicationRepos = document.getElementById("indicationRepos");

//Cette variable contient les paramètres rentrés par l'utilisateur 
localStorage

//boutonLancerTimer.textContent = "Débuter le timer";

//La fonction tempsEcoule permet de lancer à la fois les fonctions d'écoulement du temps et la transformation du bouton
boutonLancerTimer.addEventListener('click', tempsEcoule);

//récupère les paramètres donnés par l'utilisateur si ce dernier les a changé
var minute;
var seconde;
if(params.has("minutesUtilisateurTravail")){
    minute=params.get("minutesUtilisateurTravail");
    seconde= params.get("secondesUtilisateurTravail");
}else{
    seconde=0;
    minute=25;
}

//affichage du timer avec les bonnes valeurs
document.getElementById("timer").innerHTML = minute+":0"+seconde;

//variables utilisées pour gérer les intervalles de temps
let intervalID;
let timeoutID;

/*
* Gère le timer de "minutesUtilisateurTravail" minutes puis appele timerRepos
* @see timerRepos 
*/
function timerTravail(){

    clearTimeout(timeoutID);
    clearInterval(intervalID);
    
    //On change la couleur du texte "Travail"
    indicationRepos.style.color = "white";
    indicationTravail.style.color="yellow";

    if(params.has("minutesUtilisateurTravail")){
        minute=params.get("minutesUtilisateurTravail");
        seconde= params.get("secondesUtilisateurTravail");
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

        //Affichage différent selon le nombre de secondes
        if(seconde<10){
            document.getElementById("timer").innerHTML = minute+":0"+seconde;
        }else{
            document.getElementById("timer").innerHTML = minute+":"+seconde;
        }
    }, 1000)
}

/*
* Gère le timer de "minutesUtilisateurRepos" minutes puis appelle timerTravail
* @see timerTravail 
*/
function timerRepos(){

    clearTimeout(timeoutID);
    clearInterval(intervalID);
    
    indicationRepos.style.color = "yellow";
    indicationTravail.style.color="white";

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

        //Affichage différent selon le nombre de secondes
        if(seconde<10){
            document.getElementById("timer").innerHTML = minute+":0"+seconde;
        }else{
            document.getElementById("timer").innerHTML = minute+":"+seconde;
        }
    }, 1000)
}


/*
*Transforme le bouton et appelle timerTravail pour lancer la boucle
*/
function tempsEcoule(){
    boutonResetTimer.className ="fa-solid fa-arrow-rotate-left";
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

    if(params.has("minutesUtilisateurTravail")){
        minute=params.get("minutesUtilisateurTravail");
        seconde= params.get("secondesUtilisateurTravail")
    }else{
        seconde=0;
        minute=25;
    }
    
    document.getElementById("timer").innerHTML = minute+":0"+seconde;
    boutonResetTimer.className ="fa-solid fa-play";
    boutonResetTimer.removeEventListener('click', stopTempsEcoule);
    boutonLancerTimer.addEventListener('click', tempsEcoule);
}

