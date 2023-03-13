<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "ITeconomyLibrary.php"; 

	$postData = json_decode(file_get_contents('php://input'), true);

	$login = $postData["login"];
	$password = $postData["password"];

	if(empty($login) or 
		empty($password)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($login) != "string" or 
		gettype($password) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A1 = $Link->query("SELECT * FROM `BankUsers` WHERE `Login`='$login' AND `Password`='$password' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "Неверный логин или пароль!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			if($row["TypeUser"] == "block")
				ThrowError($Link, 400, "Ваш счёт заблокирован!");
			SendResponse($Link, ["id" => $row["id"], "login" => $row["Login"], "password"=> $row["Password"]]);
	    }	
	}

	mysqli_close($Link);
?>