<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	include "ITS-economyLib.php"; 

	$Sum = floor(GetPost('sum')); 

	if(isset($_POST['msg'])) { $Msg = $_POST['msg']; }
	$Msg = trim($Msg);
	$Msg = stripslashes($Msg);

	$Sender = GetPost('sender');
	$Users = explode("/*/", GetPost('users')); 

	$FirstName = Select($Link, 'FirstName', "`BankUsers`", "`Card`=".$Sender);
	$SecondName = Select($Link, 'SecondName', "`BankUsers`", "`Card`=".$Sender);
	$Balance = Select($Link, 'Balance', "`BankUsers`", "`Card`=".$Sender);
	$TypeUser = Select($Link, 'TypeUser', "`BankUsers`", "`Card`=".$Sender);
	$Operations = explode("/***/", Select($Link, 'Operations', "`BankUsers`", "`Card`=".$Sender));

	if ($TypeUser != "block") {
		if ($Sum*$Users[0] <= $Balance) {
			if ($Balance > 0) {
				if ($Users[0] <= 15) {
					
					$A2 = $Link->query("UPDATE `BankUsers` SET `Balance` = ".($Balance - $Sum*$Users[0])." WHERE `Card`= ".$Sender);

					for($i=1; $i<=$Users[0]; $i++) {
						$Operations[0]++;
						$FN = Select($Link, 'FirstName', "`BankUsers`", "`Card`=".$Users[$i]);
						$SN = Select($Link, 'SecondName', "`BankUsers`", "`Card`=".$Users[$i]);
						echo $FN." ";
						echo $SN;
						$Name = $FN." ".$SN;
						array_push($Operations, $Name);
						array_push($Operations, "-".$Sum);
						array_push($Operations, $Msg);

						$UsBalance = (int) Select($Link, 'Balance', "`BankUsers`", "`Card`='".$Users[$i]."'");
						$A3 = $Link->query("UPDATE `BankUsers` SET `Balance` = ".($UsBalance + $Sum)." WHERE `Card`= ".$Users[$i]);

						$USOperations = explode("/***/", Select($Link, 'Operations', "`BankUsers`", "`Card`='".$Users[$i]."'"));
						$USOperations[0]++;
						array_push($USOperations, $FirstName." ".$SecondName);
						array_push($USOperations, $Sum);
						array_push($USOperations, $Msg);
						$USOperation = implode("/***/", $USOperations);  
						$A4 = $Link->query("UPDATE `BankUsers` SET `Operations` = '".$USOperation."' WHERE `Card`= ".$Users[$i]);
					}
					$Operation = implode("/***/", $Operations);  
					$A5 = $Link->query("UPDATE `BankUsers` SET `Operations` = '".$Operation."' WHERE `Card`= ".$Sender);

					echo "Операция прошла успешно!";
				} else {
					echo "Превышен лимит количества переводов!";
				}
			} else {
				echo "Недопустимое значение суммы первода!";
			}
		} else {
			echo "На вашем балансе недостаточно средств!";
		}
	} else {
		echo "Ваш счёт заблокирован!";
	}

	mysqli_close($Link);
?>


