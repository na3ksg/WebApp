// 初期化処理
window.onload = function () {
	// ボタンが押されたときのイベンドハンドラを設定
	$("postBtn").onclick = writeLog;
	// ログを読み込む
	showLog();
};

// ログの表示
function showLog() {
	// Ajaxでログを取得
	ajaxGet(
		"./api.php?type=getLog",
		function (xhr, text) {
			var logs = JSON.parse(text);
			renderLog(logs);
		});
}

// ログデータに基づき描画
function renderLog(logs) {
	var html = "";
	for (var i in logs) {
		var m = logs[i];
		var name = m["name"];
		var body = m["body"];
		html += "<li>" + name + "「" + body + "」</li>";
	}
	$("logList").innerHTML = html;
}

// 書き込みを投稿する
function writeLog() {
	var name = $("name").value;
	var body = $("body").value;
	var params =
		"type = writeLog&" +
		"name=" + encodeURI(name) + "&" +
		"body=" + encodeURI(body);
	ajaxGet("./api.php?" + params, function (xhr, text) {
		$("body").value = "";// テキストフィールドを初期化
		showLog();// 書き込みを反映させる
	});
}

// Ajax用
function ajaxGet(url, callback) {
	// XMLHttpRequestのオブジェクトを作成
	var xhr = new XMLHttpRequest();
	// 非同期通信でURLをセット
	xhr.open('GET', url, true);
	// 通信状態が変化した時のイベント
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {// 通信完了
			if (xhr.status === 200) {// HTTPステータス200
				callback(xhr, xhr.responseText);
			}
		}
	};
	xhr.send('');// 通信を開始
	return xhr;
}

// 任意のIDを得る
function $(id) {
	return document.getElementById(id);
}
