<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "ITeconomyLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$userID = GetGet("ID");

	if($userID == "ID")
		ThrowError($Link, 400, "Введите ID пользователя!");

	$result = [];
	$transactions = [];

	$A1 = $Link->query("SELECT * FROM `BankUsers` WHERE `ID`= $userID LIMIT 1");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			$balance = 0;

			$A2 = $Link->query("SELECT SUM(`Transaction`) AS `Transaction` FROM `Transactions` WHERE `UserID`=$userID GROUP BY `UserID`");
			if ($A2->num_rows > 0) 
				while($b = $A2->fetch_assoc()) 
					$balance = $b["Transaction"];


			$A3 = $Link->query("SELECT * FROM `Transactions` WHERE `UserID`=$userID");
			if ($A3->num_rows > 0)
			{
				while($transaction = $A3->fetch_assoc()) 
				{
					$transactions[] = [
						"id" => $transaction["ID"],
						"transaction" => $transaction["Transaction"],
						"fromName" => $transaction["FromName"],
						"description" => $transaction["Description"]
					];
				}
			}


			$result  = [
				"id" => $row["id"],
				"firstName" => $row["FirstName"],
				"secondName" => $row["SecondName"],
				"card" => $row["Card"],
				"balance" => $balance,
				"typeUser" => $row["TypeUser"],
				"transactions" => $transactions
			];
		}

		SendResponse($Link, $result);
	}
	ThrowError($Link, 400, "Пользователь не найден!");
?>