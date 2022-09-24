<?php
	include "ITS-economyLib.php"; 
	
	$Login = GetPost('Login'); // Получение логина
	$Password = GetPost('Password'); // Получение пароля
	$PasswordRetry = GetPost('PasswordRetry'); // Получение повторения пароля
	$Name = GetPost('Name'); // Получение названия команды
	$School = GetPost('School'); // Получение названия ОУ
	//$Email = GetPost('Email');
	$Leaders = GetPost('Leaders'); // Получение ФИО наставников команды
	$Players = GetPost('Players'); // Получение ФИО участников команды

	if(empty($Login) or empty($Password) or empty($Name) or empty($School) or empty($Leaders) or empty($Players)) // Если какое-то из полей пустое
	{
		echo "Вы ввели не всю информацию, заполните все поля!";
		exit();
	}
	
	if($PasswordRetry != $Password) // Если пароль и повторение пароля не совпадают
	{
		echo "Пароли не совпадают!";
		echo $Password;
		echo "  ";
		echo $PasswordRetry;
		exit();
	}

	$Loginbd = Select($Link, "'Login'", "`GeoTeam`", "`Login`='".$Login."'"); // Получение логина из базы данных 

	if($Loginbd == $Login) // Если уже есть такой логин
	{
		echo  "Извините, введённый вами логин уже зарегистрирован.";
		exit();
	}else{ 
		$A2 = $Link->query("INSERT INTO GeoTeam (Login, Password, Name, School, Leaders, Players, Task) VALUES('$Login', '$Password', '$Name', '$School', '$Leaders', '$Players', '0/0/0/0/0/0/0/0/0/')"); // Создание новой записи с дланными о команде в базе данных

		$Message = "'Команда зарегистрировалась.";
		$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)); // Составление текста для записи в лог
		$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES ($Name, ".$Message.", NOW())"); // Запись в логи
	}
		
	if($A2) // Вывод в приложение
	{
		echo "Вы успешно зарегистрированы!";
	} else {
		echo "Ошибка! Вы не зарегистрированы.";
	}
	
	mysqli_close($Link);
?>