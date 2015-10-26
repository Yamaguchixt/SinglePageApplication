/*
 * spa.util_b.js
 */

spa.util_b = ( function () {
//--------------モジュールスコープ変数開始----------------------
	var
		configMap = {
			regex_encode_html : /[&"'><]/g,
			regex_encode_noamp : /["'><]/g,
			html_encode_map : {
				'&' : '&#38;',
				'"' : '&#34;',
				"'" : '&#39;',
				'>' : '&#62;',
				'<' : '&#60;'
			}
		},

		decodeHtml, encoddeHtml, getEmSize
	;

	configMap.encode_noamp_map = $.extend(
		{}, configMap.html_encode_map
	);
	delete configMap.encode_noamp_map['&'];
//--------------モジュールスコープ変数終了----------------------

//--------------ユーティリティメソッド開始----------------------
// decodeHtml開始
	decodeHtml = function ( str ) {
		return $( '<div/>' ).html(str || '').text();
	}
// decodeHtml終了

// encodeHtml開始
	encodeHtml = function ( input_arg_str, exclude_amp ){
		var
			input_str = String( input_arg_str ),
			regex, lookup_map
		;
		if( exclude_amp ) {
			lookup_map = configMap.encode_noamp_map;
			regex = configMap.regex_encode_noamp;
		}
		else {
			lookup_map = configMap.html_encode_map;
			regex = configMap.regex_encode_html;
		}
		return input_str_replace( regex,
			function ( match, name ) {
				return lookup_map[ match ] || '';
			}
		);
	};
// encodeHtml終了

//getEmSize開始
//emのサイズをピクセルで返す。
	getEmSize = function ( elem ){
		return Number( getComputedStyle( elem, '').fontSize.match(/\d*\.?*/)[0] );
	};
//getEmSize終了


// decodeHtml終了
//--------------ユーティリティメソッド終了----------------------
//--------------DOMメソッド開始------------------------------
//--------------DOMメソッド終了------------------------------
//--------------イベントハンドラ開始----------------------------
//--------------イベントハンドラ終了---------------------------
//--------------パブリックメソッド開始--------------------------
return {
	decodeHtml : decodeHtml,
	encodeHtml : encodeHtml,
	getEmsize  : getEmSize
};
//--------------パブリックメソッド終了--------------------------
}());


