<?php

$connect=mysql_connect("localhost","root","3139")or die("connecting is not secceeded!");
//echo "connecting is OK"."<br/>";
mysql_select_db("ast",$connect)or die("selecting databases is not seccess");

//$message = array(array("person02","1"),array("FirstName","varchar(15)"),array("LastName","varchar(15)"),array("Age","int"));
$message[0][0]="person02";
$message[0][1]="1";
$message[1][0]="FirstName";
$message[1][1]="varchar(15)";
$message[2][0]="Age";
$message[2][1]="int";
echo $message[0][0];
$tablename = $message[0][0];
$stringg=" ";
$kong=" ";
$dou=",";

for($i=1;$i<=2;$i++)
{
$stringg.=$message[$i][0];
$stringg.=$kong;
$stringg.=$message[$i][1];
if($i<2)
$stringg.=$dou;
}
//$stringg = "$message[1][0] $message[1][1],$message[2][0] $message[2][1]";
echo $stringg;
$sql = "CREATE TABLE $tablename 
(
$stringg
) ENGINE=InnoDB DEFAULT CHARSET=gb2312";
mysql_query($sql,$connect);
echo "it is ok";

mysql_close($connect);
?>