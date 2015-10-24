/*
 *spa.chat.js
 *
 */
spa.chat = (function () {
//--------------モジュールスコープ変数開始----------------------
	var
		configMap = {
			main_html : String()
				+ '<div style="padding:1em; color:#fff;">'
					+ 'Say hello to chat あ'
				+ '<div>',
		  settable_map: {},
		},
		stateMap = { $container : null },
		jqueryMap = {},

		setJqueryMap, configModule, initModule
		;
//--------------モジュールスコープ変数終了----------------------

//--------------ユーティリティメソッド開始----------------------
//--------------ユーティリティメソッド終了----------------------

//--------------DOMメソッド開始------------------------------
//DOMメソッド /setJqueryMap /開始
	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { $container : $container };
	};
//DOMメソッド /setJqueryMap /終了
//--------------DOMメソッド終了------------------------------

//--------------イベントハンドラ開始----------------------------
//--------------イベントハンドラ終了---------------------------

//--------------パブリックメソッド開始--------------------------
//パブリックメソッド /configModule /開始
	/*　目的　：　許可されたキーの構成を調整する
	 *　引数　：　構成可能なキーバリューマップ
	 *		color_name -使用する色
	 *　設定　：　
	 *		configMap.settable_map 許可されたキーを宣言する
	 *　戻り値：　true
	*/
	configModule = function ( input_map ) {
		spa.util.setConfigMap({
			input_map : input_map,
			settable_map : configMap.settable_map,
			config_map : configMap
		});
		return true;
	};
//パブリックメソッド /configModule /終了

//パブリックメソッド /initModule /開始
	/*　目的　：　 モジュールを初期化する
	 *　引数　：
	 *		$container この機能が使うJquery要素
	 *　戻り値：  true
	*/
	initModule = function ( $container ) {
		$container.html( configMap.main_html );
		stateMap.$container = $container;
		setJqueryMap();
		return true;
	};
//パブリックメソッド /initModule /終了

//パブリックメソッドを戻す
	return {
		configModule : configModule,
		initModule : initModule
	};
//--------------パブリックメソッド終了--------------------------
}());