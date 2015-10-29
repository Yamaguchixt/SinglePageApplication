/**
 *
 */

spa.signup = ( function (){
	var
		configMap = {
			main_html : String()
					+ '<div class="container spa-signup">'
							+ '<div class="col-xs-4 panel panel-primary">'
									+ '<div class="panel-heading">'
						 					+ '<h1 class="panel-title">ユーザ登録</h1>'
						 			+ '</div>'
						 			+ '<div class="panel-body">'
						 				//	+ '<form method="post" action="regist_user.jsp">'
						 							+ '<div class="form-group">'
						 									+ '<label for="userID" class="control-rabel">ユーザID</label>'
						 									+ '<input class="form-control" type="text" name="userID" id="user_id" placeholder="ユーザID">'
						 							+ '</div>'
						 							+ '<div class="form-group">'
						 									+ '<label for="userName" class="control-rabel">ユーザ名</label>'
						 									+ '<input type="text" name="userName" id="user_name" placeholder="ユーザ名" class="form-control">'
						 							+ '</div>'
						 							+ '<div class="form-group">'
						 								+ '<label for="password" class="control-rabel">パスワード</label>'
						 								+ '<input type="password" name="password" id="password" class="form-control" placeholder="パスワード">'
						 							+ '</div>'
						 							+ '<div class="form-group">'
						 									+ '<p class="control-rabel">区分</p>'
						 									+ '<div class="checkbox">'
						 											+ '<input type="checkbox" name="kubun" value="true" id="is_member">'
						 											+ '<label for="member">会員</label>'
						 									+ '</div>'
						 									+ '<div class="checkbox">'
						 											+ '<input type="checkbox" name="kubun" value="true" id="is_admin">'
						 											+ '<label for="admin">管理者</label>'
						 									+ '</div>'
						 							+ '</div>'
						 							+ '<input type="submit" value="登録" id="signup-start" class="btn btn-primary">'
						 			//		+ '</form>'
						 			+ '</div>'
						 	+ '</div>'
					+ '</div>',

			confirm_html  :  String()
				+ '<div class="panel-heading">'
						+ '<h1 class="panel-title">登録内容確認</h1>'
		 		+ '</div>'
		 		+ '<div class="panel-body">'
		 				+ '<h4>ユーザID</h4>'
		 						+ '<p class="confirm-user_id"></p>'
		 				+ '<h4>ユーザ名</h4>'
		 						+ '<p class="confirm-user_name"></p>'
		 				+ '<h4>パスワード</h4>'
		 						+ '<p class="confirm-password"></p>'
		 				+ '<h4>メンバータイプ</h4>'
		 						+ '<p class="confirm-member_type"></p>'
						+ '<input type="submit" value="確認" id="confirm-complete" class="btn btn-primary">'
		 		+ '</div>',

		 thanks_html : String()
		 		+ '<div class="panel-heading">'
		 				+ '<h1 class="panel-title">登録完了</h1>'
		 		+ '</div>'
		 		+ '<div class="panel-body">'
		 			+ '<h3>ご登録ありがとうございました </h3>'
		 			+ '<input type="submit" value="完了" id="end" class="btn btn-primary">'
			+ '</div>'



		},
	stateMap = {
		$append_target : null,
		user_id 			 : null,
		user_name 		 : null,
		password       : null,
		is_admin			 : null
	},

	jqueryMap = {
		$signup 		: null,
		$panel 		  : null,
		$user_id 		: null,
		$user_name  : null,
		$password 	: null,
		$is_member 	: null,
		$is_admin 	: null,
		$confirm_complete : null
	},

	initModule, setJqueryMap, onClickSignup, onClickComplete, onClickEnd;

	//イベントハンドラ
	onClickSignup = function( event ){
		var member_type;
		stateMap.user_id = jqueryMap.$user_id.val();
		stateMap.user_name = jqueryMap.$user_name.val();
		stateMap.password = jqueryMap.$password.val();
		stateMap.is_member = jqueryMap.$is_member.val();
		stateMap.is_admin = jqueryMap.$is_admin.val();

		member_type = stateMap.is_member === "true" ? " 会員 " : "";
		member_type += stateMap.is_admin === "true" ? " 管理者 " : "";

		jqueryMap.$panel.animate({ opacity : 0},500,'linear',function(){
			jqueryMap.$panel.html( configMap.confirm_html );

			jqueryMap.$panel.find( '.confirm-user_id' ).text( stateMap.user_id );
			jqueryMap.$panel.find( '.confirm-user_name' ).text( stateMap.user_name);
			jqueryMap.$panel.find( '.confirm-password' ).text( stateMap.is_member);
			jqueryMap.$panel.find( '.confirm-member_type' ).text( member_type);
			jqueryMap.$confirm_complete = jqueryMap.$panel.find( '#confirm-complete');

			jqueryMap.$confirm_complete.bind( 'click', onClickComplete);


			jqueryMap.$panel.animate({ opacity : 1},500);

		});


		return false;
	};

	onClickComplete = function( event ){
		var $panel = jqueryMap.$panel;

		$panel.animate({ opacity : 0 },500,'linear',function(){
			$panel.html( configMap.thanks_html );
			$panel.find( '#end' ).bind( 'click', onClickEnd);

			$panel.animate({ opacity : 1 },500);
		});


		return false;
	};

	onClickEnd = function( event ){
		alert('work');
		jqueryMap.$panel.animate({opacity : 0},500,'linear',function(){
			jqueryMap.$signup.html('');
		});

		return false;
	};

	setJqueryMap = function(){
		var $append_target = stateMap.$append_target;

		jqueryMap.$signup 	 = $append_target.find( '#signup-start' );
		jqueryMap.$panel  	 = $append_target.find( '.panel' );
		jqueryMap.$user_id 	 = $append_target.find( '#user_id' );
		jqueryMap.$user_name = $append_target.find( '#user_name' );
		jqueryMap.$password  = $append_target.find( '#password' );
		jqueryMap.$is_member = $append_target.find( '#is_member' );
		jqueryMap.$is_admin  = $append_target.find( '#is_admin' );


	};


	initModule = function( $append_target ){

		stateMap.$append_target = $append_target;
		$append_target.html( configMap.main_html );
		setJqueryMap();

		jqueryMap.$signup.bind( 'click', onClickSignup );


	};

	return {
		initModule : initModule,
		jqueryMap : jqueryMap,
		stateMap : stateMap
	};
}());