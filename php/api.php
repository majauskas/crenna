<?php 

  $sql_string = $_POST['sql_string'];

  $mysql_server = 'localhost';
  $mysql_login = 'root';
  $mysql_password = '';
  $mysql_database = 'crenna';
  
  mysql_connect($mysql_server, $mysql_login, $mysql_password);
  mysql_select_db($mysql_database);
  

  $query = mysql_query($sql_string);
  
  $rows = array();
  while($r = mysql_fetch_assoc($query)) {
  	$rows[] = $r;
  }
  
  print json_encode($rows);  


// 	//INSERT INTO `crenna`.`utenti` (`nome`, `cognome`, `sesso`, `data_nascita`, `email`, `password`, `id`, `foto`, `dt_login`) VALUES ('mindaugas', 'Ajauskas', 'M', '1982-01-29', 'm.ajauskas@hotmail.it', 'Ajauskam01', '1', NULL, CURRENT_TIMESTAMP);

//  	echo json_encode($results);
	
  
?>
