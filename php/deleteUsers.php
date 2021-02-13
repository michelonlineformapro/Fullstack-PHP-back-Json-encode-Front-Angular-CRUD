<?php

require "DatabasePDO.php";


//connexion a caonfig -> database class
$database = new DatabasePDO();
//Recup methode PDO
$db = $database->getPDO();

if(isset($_GET['id'])){
  $id = $_GET['id'];
}else{
  return http_response_code(400);
}


//SUPPRIMER

$sql = "DELETE FROM `userstest`  WHERE `id` = '{$id}' LIMIT 1";
$delete = $db->prepare($sql);

$delete->bindParam(1, $id);
$ok = $delete->execute();

if($ok){
  http_response_code(204);
}else{
  http_response_code(422);
}
