<?php
	include "ITS-economyLib.php"; 

	$Type = GetPost('Type'); // Получение типа ответа
	$Number = GetPost('Number'); // Получение номер ответа
	$Answer = GetPost('Answer'); // Получение самого ответа
	$id = GetPost('id'); // Получение id команды

	if($Type == "City") // Если ответ для города
	{
		$City = Select($Link, "City", "`GeoService`", "`id`='1'"); // Получение правильного ответа
		$Name = Select($Link, "Name", "`GeoTeam`", "`id`='$id'"); // Получение название команды

		if($City == $Answer) // Если ответ правильный
		{
			echo "Правильно"; // Вывод в приложение
			$A5 = $Link->query("UPDATE `GeoTeam` SET `Task`='1/0/0/0/0/0/0/0/0/' WHERE `id`='$id'"); // Изменение списка состояний каждого задания

			$Message = "'Команда правильно угадала город - ";
			$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)).$Answer."'"; // Составление текста для записи в лог
			$Team = "'".$id." - ".$Name."'"; // Составление названия команды для записи в лог
	
			$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES (".$Team.", ".$Message.", NOW())"); // Запись в логи
			exit;
		}else{
			echo $Name;
			$Message = "'Команда неправильно угадала город - ";
			$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)).$Answer."'"; // Составление текста для записи в лог
			$Team = "'".$id." - ".$Name."'"; // Составление названия команды для записи в лог

			$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES (".$Team.", ".$Message.", NOW())"); // Запись в логи
			echo "Неправильно"; // Вывод в приложение
			exit;
		}	
	}

	if($Type == "Street") // Если ответ для улицы
	{
		$Street = Select($Link, "Street", "`GeoTask`", "`id`='$Number'"); // Получение правильного ответа
		$Name = Select($Link, "Name", "`GeoTeam`", "`id`='$id'"); // Получение название команды
		$Task = Select($Link, "Task", "`GeoTeam`", "`id`='$id'"); // Получение списка состояний каждого задания
		$Task = explode("/", $Task);

		if($Street == $Answer) // Если ответ правильный
		{
			echo "Правильно"; // Вывод в приложение
			$Task[$Number] = "1";

			$Task = $Task[0] . "/" . $Task[1] . "/" . $Task[2] . "/" . $Task[3] . "/" . $Task[4] . "/" . $Task[5] . "/" . $Task[6] . "/" . $Task[7] . "/" . $Task[8] . "/" ;

			$A3 = $Link->query("UPDATE `GeoTeam` SET `Task`='$Task' WHERE `id`='$id'"); // Изменение списка состояний каждого задания

			$Message = "'Команда правильно угадала улицу - ";
			$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)).$Answer."'"; // Составление текста для записи в лог
			$Team = "'".$id." - ".$Name."'"; // Составление названия команды для записи в лог
			$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES (".$Team.", ".$Message.", NOW())"); // Запись в логи
			exit;
		}else{
			$Message = "'Команда неправильно угадала улицу - ";
			$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)).$Answer."'"; // Составление текста для записи в лог
			$Team = "'".$id." - ".$Name."'"; // Составление названия команды для записи в лог
			$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES (".$Team.", ".$Message.", NOW())"); // Запись в логи
			echo "Неправильно"; // Вывод в приложение
			exit;
		}	
	}

	if($Type == "Task") // Если ответ для загадки улицы
	{
		$Task = Select($Link, "Answer", "`GeoTask`", "`id`='$Number'"); // Получение правильного ответа
		$Name = Select($Link, "Name", "`GeoTeam`", "`id`='$id'"); // Получение название команды
		$TaskPlayer = Select($Link, "Task", "`GeoTeam`", "`id`='$id'"); // Получение списка состояний каждого задания
		$TaskPlayer = explode("/", $TaskPlayer);

		if($Task == $Answer) // Если ответ правильный
		{
			echo "Правильно"; // Вывод в приложение
			$TaskPlayer[$Number] = "2";

			$TaskPlayer = $TaskPlayer[0] . "/" . $TaskPlayer[1] . "/" . $TaskPlayer[2] . "/" . $TaskPlayer[3] . "/" . $TaskPlayer[4] . "/" . $TaskPlayer[5] . "/" . $TaskPlayer[6] . "/" . $TaskPlayer[7] . "/" . $TaskPlayer[8] . "/" ;

			$A3 = $Link->query("UPDATE `GeoTeam` SET `Task`='$TaskPlayer' WHERE `id`='$id'"); // Изменение списка состояний каждого задания

			$Message = "'Команда правильно угадала задание улицы - ";
			$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)).$Answer."'"; // Составление текста для записи в лог
			$Team = "'".$id." - ".$Name."'"; // Составление названия команды для записи в лог
			$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES (".$Team.", ".$Message.", NOW())"); // Запись в логи
			exit;
		}else{
			$Message = "'Команда неправильно угадала задание улицы - ";
			$Message = mb_convert_encoding($Message, 'windows-1251', mb_detect_encoding($Message)).$Answer."'"; // Составление текста для записи в лог
			$Team = "'".$id." - ".$Name."'"; // Составление названия команды для записи в лог
			$A6 = $Link->query("INSERT INTO `GeoLogs` (Team, Message, TimeLog) VALUES (".$Team.", ".$Message.", NOW())"); // Запись в логи
			echo "Неправильно"; // Вывод в приложение
			exit;
		}	
	}

	mysqli_close($Link);
?>