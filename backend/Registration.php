<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');
	
	include "ITeconomyLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$firstName = $postData["firstName"];
	$secondName = $postData["secondName"];
	$card = $postData["card"];
	$login = $postData["login"];
	$password = $postData["password"];

	if(empty($firstName) or 
		empty($secondName) or 
		empty($card) or 
		empty($login) or 
		empty($password)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($firstName) != "string" or 
		gettype($secondName) != "string" or 
		gettype($card) != "integer" or 
		gettype($login) != "string" or 
		gettype($password) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	if(!preg_match("/^[1-9][0-9]{3}$/i", $card))
		ThrowError(400, "Неверный номер карты!");

	$A1 = $Link->query("SELECT * FROM `BankUsers` WHERE `Login`='$login'");
	if ($A1->num_rows > 0) 
	   ThrowError($Link, 400, "Логин уже занят!");

	$A2 = $Link->query("SELECT * FROM `BankUsers` WHERE `Card`=".$card);
	if ($A2->num_rows > 0) 
	   ThrowError($Link, 400, "Карта уже занята!");

	$A3 = $Link->query("INSERT INTO BankUsers (FirstName, SecondName, Card, Login, Password) VALUES('$firstName', '$secondName', '$card', '$login', '$password')"); 

	if($A3)
		SendResponse($Link, "Вы успешно зарегестрировались на сайте");
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>