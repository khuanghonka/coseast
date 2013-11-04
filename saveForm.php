<?php

$connect=mysql_connect("localhost","root","3139")or die("connecting is not secceeded!");
//echo "connecting is OK"."<br/>";
mysql_select_db("ast",$connect)or die("selecting databases is not seccess");

$bu = "cr";
$id = "2";
$content = "dsafafdsaadf";

$filename = $bu;
$filename.= "_";
$order= mysql_query("SELECT activity_name FROM $bu WHERE ID = $id");

$row= mysql_fetch_array($order);
$filename.= $row[0];
$filename.= ".html";
mysql_query("UPDATE $bu SET htmlFile_name = '$filename' WHERE ID='$id'");
$file = fopen($filename,"w");
echo fwrite($file,$content);
echo "sss";
fclose($file);

mysql_close($connect);
?>