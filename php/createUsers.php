<?php

//Appel des classes
require "DatabasePDO.php";


//connexion a caonfig -> database class
$database = new DatabasePDO();
//Recup methode PDO
$db = $database->getPDO();
//Recup flux php recup des valeurs du json et decode
$postData = json_decode(file_get_contents("php://input"));
//Les champs existe et ne sont pas vide
if(isset($postData) && !empty($postData)){
  //Association des valeur au input angular
  $email = $postData->email;
  $password = $postData->password;
  //Requètes
  $sql = "INSERT INTO `userstest` (`id`, `email`, `password`) VALUES (null, '{$email}', '{$password}')";
  $req = $db->prepare($sql);
  if($req){
    //Tableau
    $users = [
      "email" => $email,
      "password" => $password,
      "id" => $db->lastInsertId()
    ];
    //Bind des params
    $req->bindParam(1, $id);
    $req->bindParam(2, $email);
    $req->bindParam(3, $password);

    $req->execute(array($id, $email, $password));
    //Reponse serveur
    http_response_code(200);
    //encodage du tableau
    echo json_encode($users);
  }else{
    http_response_code(404);
  }
}
