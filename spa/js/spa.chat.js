/*
 *spa.chat.js
 *
 */
spa.chat = (function () {
//--------------モジュールスコープ変数開始----------------------
	var
		configMap = {
			main_html : String()
				+ '<div class="spa-chat">'
					+ '<div class="spa-chat-head">'
						+ '<div class="spa-chat-head-toggle">+</div>'
						+ '<div class="spa-chat-head-title">Chat</div>'
					+ '</div>'//head
					+ '<div class="spa-chat-closer">X</div>'
					+ '<div class="spa-chat-sizer">'
						+ '<div class="spa-chat-msgs"></div>'
						+ '<div class="spa-chat-box">'
							+ '<input type="text">'
							+ '<div>send</div></div>'
						+ '</div>'
					+ '</div>'//sizer
				+ '</div>',//chat

		  settable_map: {
		  	slider_open_time 		: true,
				slider_close_time 	: true,
				slider_opened_em  	: true,
				slider_closed_em 		: true,
				slider_opened_title : true,
				slider_closed_title : true,

				chat_model 			: true,
				people_model 		: true,
				set_chat_anchor :true
		  },

		  slider_open_time 		 : 250,
			slider_close_time 	 : 250,
			slider_opened_em  	 : 16,
			slider_opened_min_em : 10,
			window_height_min_em : 20,
			slider_closed_em 		 : 2,
			slider_opened_title  : 'Click to close',
			slider_closed_title  : 'Click to open',

			chat_model 			: null,
			people_model 		: null,
			set_chat_anchor :null
		},
		stateMap = {
			$append_target 		: null,
			position_type 		: 'closed',
			px_per_em 				: 0,
			slider_hidden_px	: 0,
			slider_closed_px	: 0,
			slider_opened_px 	: 0
		},
		jqueryMap = {},

		setJqueryMap, getEmSize, setPxSizes, setSliderPosition,
		onClickToggle, configModule, initModule,
		removeSlider, handleResize
		;
//--------------モジュールスコープ変数終了----------------------

//--------------ユーティリティメソッド開始----------------------
	getEmSize = function ( elem ) {
		return Number(
				getComputedStyle( elem, '' ).fontSize.match(/\d*\.?\d*/)[0]
		);
	};
//--------------ユーティリティメソッド終了----------------------

//--------------DOMメソッド開始------------------------------
//DOMメソッド /setJqueryMap /開始
	setJqueryMap = function () {
		var
			$append_target = stateMap.$append_target,
			$slider = $append_target.find( '.spa-chat' );

		jqueryMap = {
				$slider : $slider,
				$head : $slider.find( '.spa-chat-head' ),
				$toggle : $slider.find( '.spa-chat-head-toggle' ),
				$title : $slider.find( '.spa-chat-head-title' ),
				$sizer : $slider.find( '.spa-chat-sizer' ),
				$msgs : $slider.find( '.spa-chat-msgs' ),
				$box : $slider.find( '.spa-chat-box' ),
				$input : $slider.find( '.spa-chat-input input[type=text]' )
		};
	};
//DOMメソッド /setJqueryMap /終了

//DOMメソッド　/setPxSizes/ 開始
	setPxSizes = function () {
		var px_per_em, window_height_em,  opened_height_em;
		px_per_em = getEmSize( jqueryMap.$slider.get(0) );
		window_height_em = Math.floor( ( $( window ).height() / px_per_em ) + 0.5);
		opened_height_em
			= window_height_em > configMap.window_height_min_em
			? configMap.slider_opened_em
			: configMap.slider_opened_min_em;

		stateMap.px_per_em = px_per_em;
		stateMap.slider_closed_px = configMap.slider_closed_em * px_per_em;
		stateMap.slider_opened_px = opened_height_em * px_per_em;
		jqueryMap.$slider.css({
			height : ( opened_height_em -2 ) * px_per_em
		});
	};
//DOMメソッド　/setPxSizes/ 終了

//パブリックメソッドDOM /setSliderPosition/ 開始
	/*	用例	：spa.chat.setSliderPosition( 'closed' );
	 *	目的	：チャットスライダーが要求された状態になるようにする
	 *	引数	：
	 *		position_type -enum('closed' 'opened', 'hidden')
	 *		callback -アニメーションの最後のオプションのコールバック(コールバックは引数にスライダDOM要素を受け取る)
	 *	動作	：スライダーが要求に合致していた場合は現在の状態のまま。それ以外はアニメーションで要求された状態にする。
	 */
	setSliderPosition = function ( position_type, callback ){
		var
			height_px, animate_time, slider_title, toggle_text;

		//スライダーがすでに要求された位置にある場合はtrueを返す。
		if ( stateMap.position_type === position_type ){
			return true;
		}

		//アニメーションパラメータを用意する
		switch ( position_type ){
			case 'opened' :
				height_px = stateMap.slider_opened_px;
				animate_time = configMap.slider_open_time;
				slider_title = configMap.slider_opened_title;
				toggle_text = '=';
				break;

			case 'hidden' :
				height_px = 0;
				animate_time = configMap.slider_open_time;
				slider_title = '';
				toggle_text = '+';
				break;

			case 'closed' :
				height_px = stateMap.slider_closed_px;
				animate_time = configMap.slider_close_time;
				slider_title = configMap.slider_closed_title;
				toggle_text = '+';
				break;
				//未知のposition_typeに対処
			default : return false;
		}

		//スライダー位置をアニメーションで変更する
		stateMap.position_type = '';
		jqueryMap.$slider.animate(
			{ height : height_px },
			animate_time,
			function () {
				jqueryMap.$toggle.prop( 'title', slider_title );
				jqueryMap.$toggle.text( toggle_text );
				stateMap.position_type = position_type;
				if ( callback ) { callback( jqueryMap.$slider ); }
			}
		);
		return true;
	};
//パブリックメソッドDOM /setSliderPosition/ 終了
//--------------DOMメソッド終了------------------------------

//--------------イベントハンドラ開始----------------------------
	onClickToggle = function ( event ) {
		var set_chat_anchor = configMap.set_chat_anchor;
		if ( stateMap.position_type === 'opened' ){
			set_chat_anchor( 'closed' );
		}else if ( stateMap.position_type === 'closed' ) {
			set_chat_anchor( 'opened' );
		}
		return false;
	};
//--------------イベントハンドラ終了---------------------------

//--------------パブリックメソッド開始--------------------------
//パブリックメソッド /configModule /開始
	/*　用例　：　spa.chat.configModule({ slider_open_em : 18 });
	 *　目的　：　初期化前にモジュールを構成する
	 *　引数　：　構成可能なキーバリューマップ
	 *		set_chat_anchor -オープンまたはクローズ状態を示すようにURIアンカーを変更するコールバック。
	 *			このコールバックは要求された状態を満たせない場合falseを返さなければならない。
	 *		chat_model -インスタントメッセージングとやり取りするメソッドを提供するチャットモデルオブジェクト
	 *		people_model -モデルが保持する人々のリストを管理するメソッドを提供するピープルモデルオブジェクト
	 *　　 slider_* -すべてのオプションのスカラー。完全なリストはmapConfig.settable_mapを参照。
	 *
	 *　動作　：　
	 *		指定された引数で内部構成データ構造(configMap)を更新する。その他の動作は行わない。
	 *　戻り値：　true
	 *　例外発行　：　受け入れられない引数、欠如した引数でエラーオブジェクトとスタックトレース
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
	/*　用例　：		spa.chat.initModule( $('#div_id) );
	/*　目的　：　 ユーザに機能を提供するようにチャットに指示する。
	 *　引数　：
	 *		$container この機能が使うJquery要素
	 *　動作　：		指定されたコンテナにチャットスライダーを付加し、HTMLコンテンツで埋める。そして要素、イベント、ハンドラを初期化する。
	 *　戻り値：  true
	*/
	initModule = function ( $append_target ) {
		$append_target.append( configMap.main_html );
		stateMap.$append_target = $append_target;
		setJqueryMap();
		setPxSizes();

		//チャットスライダーをデフォルトのタイトルと状態で初期化する
		jqueryMap.$toggle.prop( 'title', configMap.slider_closed_title );
		jqueryMap.$head.click( onClickToggle );
		stateMap.position_type = 'closed';
		onClickToggle({});

		return true;
	};
//パブリックメソッド /initModule /終了
//パブリックメソッド /removeSlider /開始
	removeSlider = function () {
		//DOMコンテナを削除する。イベントのバインディングも削除する
		if ( jqueryMap.$slider ) {
			jqueryMap.$slider.remove();
			jqueryMap = {};
		}
		stateMap.$appent_target = null;
		stateMap.position_type = 'closed';

		//主な構成を解除する
		configMap.chat_model = null;
		configMap.people_model = null;
		configMap.set_chat_anchor = null;
		return true;
	};
//パブリックメソッド /removeSlider /終了

//パブリックメソッド /handleReSize /開始
/* 目的	:	ウィンドウリサイズイベントに対して、モジュールが提供する表示を調整する。
 * 動作	:	ウィンドウの高さ幅が所定の閾値を下回ったら、縮小したウィンドウサイズに合わせてチャットスライダーのサイズを変更する。
 * 戻り値　；
 * 		false -リサイズを考慮していない
 * 		true  -リサイズを考慮した。
 */
 handleResize = function () {
	 //スライダーコンテナがなにもなければ何もしない
	 if ( !jqueryMap.$slider ){ return false; }

	 setPxSizes();
	 if ( stateMap.position_type === 'opened' ){
		 jqueryMap.$slider.css({ height : stateMap.slider_opened_px });
	 }
	 return true;
 }
//パブリックメソッド /handleReSize /終了




//パブリックメソッドを戻す
	return {
		setSliderPosition : setSliderPosition,
		configModule 			: configModule,
		initModule 				: initModule,
		removeSlier				: removeSlider,
		handleResize			: handleResize
	};
//--------------パブリックメソッド終了--------------------------
}());
