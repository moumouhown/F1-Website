window.onload = function loadDoc() {
    var xhttp = new XMLHttpRequest();//Créer un objet XMLHttpRequest
    xhttp.onreadystatechange = function() { //
      if (this.readyState == 4 && this.status == 200) { // readyState=4: Les données sont complètement accessibles.|| status=200: "OK" si la requête a été exécutée avec succès,
        myFunction(this);
      }
    };

    const files = new Array ("xml/classementtour1.xml","xml/classementtour2.xml","xml/classementtour3.xml","xml/classementtour4.xml");

    var i = 1;                  
    xhttp.open("GET","xml/classementtour1.xml", true); // initialise et prépare l’envoi de la requête,
    xhttp.send(); // envoi de la requete pour le 1er fichier xml
    
    function myLoop() {         //boucle pour lire les fichiers xmls 
    setTimeout(function() {
    xhttp.open("GET", files[i], true); //prépare l’envoi de la requête
    xhttp.send(); //envoi
     i++;   
     
     if(i==4) i=0;                
      if (i < 5) {          
      myLoop(); // boucle pour fetch des differents fichiers xmls           
      }                      
    }, 10000) //10000 ici = 10secondes, on a choisi 10s pour voir les resultats plus rapidement, mais dans la vie reele, les resultats changent chaque tour, or 1min 30 a peu pres
      }
    myLoop();  

    
  }
  function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML; //on recupère les resultats après send()
    // on commence a remplir le tableau avec les elements des docs xmls
    var table="<thead><tr><td colspan='4' class='classy1'> <center> <p id='blink'></p><h6>Classement des pilotes en direct</h6></center></td></tr><tbody><tr class='classyl2'><th>Rang</th><th>Pilote</th><th>Temps</th><th>Tour</th></tr>";
    var x = xmlDoc.getElementsByTagName("competiteur");
    for (i = 0; i <x.length; i++) { 
      if(i%2==0){   //cette condition a ete ajoute seulement pour avoir une couleure differente entre chaque ligne, ici la ligne impair, elle prend une couleur
      table += "<tr class='blacko'><td class='numeroT'><b>" +
      x[i].getElementsByTagName("rang")[0].childNodes[0].nodeValue +
      "</b></td><td style='width: 500px;'>" + 
        "<span class='firstname'>"+ x[i].getElementsByTagName("prenom")[0].childNodes[0].nodeValue + "</span> &nbsp"+ 
     "<span class='lastname1' ><b>"+ x[i].getElementsByTagName("nom")[0].childNodes[0].nodeValue + "</b></span> &nbsp"+ 
     "<span class='ecurie1' >" + x[i].getElementsByTagName("ecurie")[0].childNodes[0].nodeValue + "</span> &nbsp"+ 
      "</td><td id='blink1'>"+
      x[i].getElementsByTagName("temps")[0].childNodes[0].nodeValue +
      "</td><td>" + 
      x[i].getElementsByTagName("tour")[0].childNodes[0].nodeValue +
      "</td></tr>" ;
        
    }
    else{   //cas i impair, donc la ligne prends la couleur 2
      table += "<tr><td class='numeroT'><b>" +
      x[i].getElementsByTagName("rang")[0].childNodes[0].nodeValue +
      "</b></td><td style='width: 500px;'>" + 
        "<span class='firstname'>"+ x[i].getElementsByTagName("prenom")[0].childNodes[0].nodeValue + "</span> &nbsp"+ 
     "<span class='lastname1' ><b>"+ x[i].getElementsByTagName("nom")[0].childNodes[0].nodeValue + "</b></span> &nbsp"+ 
     "<span class='ecurie1' >" + x[i].getElementsByTagName("ecurie")[0].childNodes[0].nodeValue + "</span> &nbsp"+ 
      "</td><td id='blink1'>"+
      x[i].getElementsByTagName("temps")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("tour")[0].childNodes[0].nodeValue +
      "</td></tr>" ;
        
    }
    }
    table+="</tbody><td colspan='4' style='border:none;'><a href='#cont2'><h3>Afficher le classement de la saison ➤</h3> </a></td></tr>";
    //la table est rempli
    document.getElementById("pilotes").innerHTML = table;
  }  
