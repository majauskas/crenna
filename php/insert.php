<?php 

  $sql_string = $_POST['sql_string'];

  $mysql_server = 'localhost';
  $mysql_login = 'root';
  $mysql_password = '';
  $mysql_database = 'crenna';
  
  $con = mysql_connect($mysql_server, $mysql_login, $mysql_password);
  mysql_select_db($mysql_database);

  $query = mysql_query($sql_string);
  print $query;
  mysql_close($con);
  
?>
