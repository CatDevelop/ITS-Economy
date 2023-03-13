<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "ITeconomyLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$result = [];

	$A1 = $Link->query("SELECT * FROM `BankUsers`");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			$result[]  = [
				"id" => $row["id"],
				"firstName" => $row["FirstName"],
				"secondName" => $row["SecondName"],
				"card" => $row["Card"]
			];
		}

		SendResponse($Link, $result);
	}
	SendResponse($Link, []);
?>