<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	include "ITS-economyLib.php"; 

	$Login = GetPost('Login'); // Получение логина
	$Password = GetPost('Password'); // Получение пароля

	if(empty($Login) or empty($Password)) // Если какое-то из полей пустое
	{
		echo "Вы ввели не всю информацию, заполните все поля!";
		exit();
	}

	if(isset($Login) && isset($Password))
	{
		$Loginbd = Select($Link, 'Login', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'"); // Получение логина из базы данных
		$Passwordbd = Select($Link, 'Password', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");  // Получение пароля из базы данных

		
		if($Passwordbd == $Password) //Проверка введенных данных
		{
			$id = Select($Link, 'id', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");
			echo "Вы успешно авторизировались!/*/";
		}
		else{
			echo "Неправильный логин или пароль!";
			exit();
		}
	} 
	else{
		echo "Значение не пришло!";
		exit();
	}

	$TypeUser = Select($Link, 'TypeUser', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");
	$FirstName = Select($Link, 'FirstName', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");
	$SecondName = Select($Link, 'SecondName', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");
	$Balance = Select($Link, 'Balance', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");
	$Card = Select($Link, 'Card', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");
	$Operations = Select($Link, 'Operations', "`BankUsers`", "`Login`='".$Login."' AND `Password`='".$Password."'");

	echo $id . "/*/" . $TypeUser . "/*/" . $FirstName . "/*/" . $SecondName . "/*/" . $Balance ."/*/" . $Card. "/*/" . $Operations; // Вывод данных о пользователе в приложение
	
	mysqli_close($Link);
?>