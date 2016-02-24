<?php

define("LOGFILE", "./log.json"); // 定数の定義
// ログファイルの確認
if (!file_exists(LOGFILE)) {
	file_put_contents(LOGFILE, "[]");
}
// typeの値に応じて分岐
$type = isset($_GET["type"]) ? $_GET["type"] : "";
if ($type == "getLog") {
	getLog();
} elseif ($type == "writeLog") {
	writeLog();
} else {
	echo "[]";
	exit;
}

// ログの取得処理
function getLog() {
	$json = file_get_contents(LOGFILE);
	if ($json == "") {$json = "[]";}
	echo $json;
}

// ログの書き込み
function writeLog() {
	// パラメータを得る
	$name = !empty($_GET["name"]) ? $_GET["name"] : "名無し";
	$body = isset($_GET["body"]) ? $_GET["body"] : "";
	if ($body == "") {
		echo '{"stat":"error","msg":"本文がありません"}';
		exit;
	}
	// ログに追記する
	$name = htmlspecialchars($name);
	$body = htmlspecialchars($body);
	$json = file_get_contents(LOGFILE);
	$a = json_decode($json);
	if (!is_array($a)) {
		$a = array();
	}
	array_unshift($a, array("name" => $name, "body" => $body));
	$json = json_encode($a);
	file_put_contents(LOGFILE, $json);
	echo '{"stat":"ok"}';
}
