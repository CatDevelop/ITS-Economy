<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "ITeconomyLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$login = $postData["login"];
	$password = $postData["password"];

	$from = $postData["from"];
	$toArray = $postData["to"];
	$transaction = $postData["transaction"];
	$description = $postData["description"];

	if(empty($login) or 
		empty($password)
	)
		ThrowError($Link, 400, "Требуется авторизация!");

	$A0 = $Link->query("SELECT * FROM `BankUsers` WHERE `id`=$from AND `Login`='$login' AND `Password`='$password'");
	if ($A0->num_rows <= 0) 
		ThrowError($Link, 401, "Неверный логин или пароль!");

	if(empty($from) or 
		empty($toArray) or 
		empty($transaction)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($from) != "integer" or 
		gettype($toArray) != "array" or 
		gettype($transaction) != "integer" or
		gettype($description) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	if($transaction <= 100)
		ThrowError($Link, 401, "Недопустимое значение суммы первода!");


	if(count($toArray) <= 0)
		ThrowError($Link, 401, "Вы ввели не всю информацию, заполните все поля!");

	if(count($toArray) > 10)
		ThrowError($Link, 401, "Слишком большое количество получателей!");

	$typeUser = 'user';

	$A1 = $Link->query("SELECT `TypeUser` FROM `BankUsers` WHERE `id`=$from");
	if ($A1->num_rows > 0) 
	{
		while($type = $A1->fetch_assoc()) 
			if($type == 'block')
				ThrowError($Link, 401, "Ваш счёт заблокирован!");
	} else {
		ThrowError($Link, 401, "Отправителя не существует!");
	}

	$balance = 0;

	$A2 = $Link->query("SELECT SUM(`Transaction`) AS `Transaction` FROM `Transactions` WHERE `UserID`=$from GROUP BY `UserID`");
	if ($A2->num_rows > 0) 
		while($b = $A2->fetch_assoc()) 
			$balance = $b["Transaction"];
	

	if($balance < $transaction*count($toArray))
		ThrowError($Link, 401, "На вашем балансе недостаточно средств!");

	$A5 = $Link->query("SELECT FirstName, SecondName FROM `BankUsers` WHERE `id`=$from");
	if ($A5->num_rows > 0) 
		while($u = $A5->fetch_assoc()) 
			$fromName = $u["FirstName"]." ".$u["SecondName"];

	foreach ($toArray as $key => $value) {
		$A6 = $Link->query("SELECT id, FirstName, SecondName FROM `BankUsers` WHERE `Card`=$value");
		if ($A6->num_rows > 0) 
			while($u = $A6->fetch_assoc()) 
			{
				$toName = $u["FirstName"]." ".$u["SecondName"];
				$toId= $u["id"];
			}

		if(empty($description))
		{
			$A3 = $Link->query("INSERT INTO Transactions (UserID, Transaction, FromName) VALUES('$from', ".(-1)*($transaction).", '$toName')"); 
			$A4 = $Link->query("INSERT INTO Transactions (UserID, Transaction, FromName) VALUES('$toId', '$transaction', '$fromName')"); 	
		} else {
			$A3 = $Link->query("INSERT INTO Transactions (UserID, Transaction, FromName, Description) VALUES('$from', ".(-1)*($transaction).", '$toName', '$description')"); 
			$A4 = $Link->query("INSERT INTO Transactions (UserID, Transaction, FromName, Description) VALUES('$toId', '$transaction', '$fromName', '$description')"); 	
		}
	}

	if($A3)
		SendResponse($Link, "Операция прошла успешно!");
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>
