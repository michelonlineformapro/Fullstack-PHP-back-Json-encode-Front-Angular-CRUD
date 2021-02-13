<?php

require "DatabasePDO.php";


//connexion a config -> database class
$database = new DatabasePDO();
//Recup methode PDO
$db = $database->getPDO();

$postData = json_decode(file_get_contents("php://input"));

if (isset($postData) && !empty($postData)) {
  //Association des valeur au input angular
  $email = $postData->email;
  $password = $postData->password;

  $sql = "INSERT INTO userstest (email, password) VALUES ('{$email}', '{$password}')";
  $record = $db->prepare($sql);
  $record->bindParam(1, $email);
  $record->bindParam(2, $password);

  $res = $record->execute(array($email, $password));
  if($res){
    $users = [
      "email" => $email,
      "password" => $password,
      "id" => $db->lastInsertId()
    ];
    echo json_encode($users);
  }
}
