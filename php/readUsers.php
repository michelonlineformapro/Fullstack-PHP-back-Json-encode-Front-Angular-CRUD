<?php
require "DatabasePDO.php";

//connexion a config -> database class
$database = new DatabasePDO();
//Recup methode PDO
$db = $database->getPDO();
//Lecture des utilisateurs
//Tableau vide
$users = [];
//Requète SQL
$sql = "SELECT * FROM userstest";
$res = $db->query($sql);

if($res){
  //Init du compteur d'elements
  $i = 0;
  //Boucle de lecture
  while ($row = $res->fetch(PDO::FETCH_ASSOC)){
    $users[$i]['id'] = $row['id'];
    $users[$i]['email'] = $row['email'];
    $users[$i]['password'] = $row['password'];
    //Incremente le compteur
    $i++;
  }

  //Si tous va bien on encode SQL
  echo json_encode($users);
}else{
  http_response_code(404);
}
