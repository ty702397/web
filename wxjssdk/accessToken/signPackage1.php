<?php
	// 实现微信分享功能
	// 通过script标签引入该文件，通过url参数传递原网页的完整url
	error_reporting(0);
	$queryString = $_SERVER["QUERY_STRING"];// 获取PHP后的网址参数，格式为：originUrl=...
	$url = substr($queryString,10);	// 截取原网页的完整url
	
	require_once "jssdk.php";
	$jssdk = new JSSDK("AppID", "AppSecret", $url);// 改为自己公众号的AppID、AppSecret
	$signPackage = $jssdk->GetSignPackage();
	echo "var signPackage=";
 	die(json_encode($signPackage));// 返回微信分享所需参数
	
if($_GET['Type'] == "access_token"){
//  echo getAccess_token();
 }
 else if($_GET['Type'] == "jsapi_ticket"){
//  echo getJsapi_ticket();
 }
 else if($_GET['Type'] == "config"){
	  $url = $_GET['url'];
  require_once "jssdk.php";
  $jssdk = new JSSDK("wx39c079124e1ee31b", "56ca4e768e76b22031170c8dc0161501", $url);// 改为自己公众号的AppID、AppSecret
  $signPackage = $jssdk->GetSignPackage();
  echo "var signPackage=";
  die(json_encode($signPackage));// 返回微信分享所需参数
 }
	
	
 ?>