/*
 *spa.fake.js
*/

spa.fake = ( function () {
	var getPeopleList, fakeIdSerial, makeFakeId, mockSio;

	fakeIdSerial = 5;

	makeFakeId = function () {
		return 'id' + String ( fakeIdSerial++ );
	}

	getPeopleList = function () {
		return [
		  { name : 'Betty', _id : '_id_01',	css_map : { top : 20, left : 20, 'background-color' : 'rgb( 128, 128, 128)' }
		  },
		  { name : 'Mike', _id : 'id_02', css_map : { top : 60, left : 20,'cackground-color' : 'rgb( 128, 255, 128)'}
		  },
		  { name : 'Yuta', _id : 'id_03', css_map : { top : 100, left : 20,'cackground-color' : 'rgb( 128, 192, 192)'},
		  },
		  { name : 'Alice', _id : 'id_04', css_map : { top : 140, left : 20,'cackground-color' : 'rgb( 192, 128, 128)'}
		  }
		 ];
	};

	mockSio = ( function() {
		var on_sio, emit_sio, callback_map = {};

		on_sio = function( msg_type, callback ){
			callback_map[ msg_type ] = callback;
		};

		emit_sio = function( msg_type, data){
			if( msg_type === 'adduser' && callback_map.userupdate ){
				setTimeout( function () {
					callback_map.userupdate(
						[{_id : makeFakeId(),
							 name : data.name,
							 css_map : data.css_map
						}]
					);
				},3000 );
			}
		};

		return { emit :emit_sio, on : on_sio };
	}());

	return { getPeopleList : getPeopleList,
					 mockSio : mockSio
	};
}());