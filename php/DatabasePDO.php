<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, PATCH, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class DatabasePDO
{
  public function getPDO(){
    $user = "root";
    $pass = "";

    try {
      $db = new PDO("mysql:host=localhost;dbname=fullstack;charset=utf8", $user, $pass);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $db;
    }catch (PDOException $e){
      echo "Erreur de connexion à PDO" .$e->getMessage();
    }
  }
}
