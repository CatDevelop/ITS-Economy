<?php
	include "ITS-economyLib.php"; 

	$A1 = $Link->query("SELECT `TimeOfStart` FROM `GeoService` WHERE `id`='1'"); // Получение времени начала квеста
	$A2 = $A1->fetch_array(MYSQLI_ASSOC);
	$Time=$A2['TimeOfStart'];

	echo $Time; // Вывод времени в приложение

	mysqli_close($Link);
?>
