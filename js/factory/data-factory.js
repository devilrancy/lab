app.factory( 'DataLoader', function( $http, $stateParams, $location ){


	function getData( api, callback, params, time ) {


		var cache = ( time || isMenuTap ) ? '&noCache=' + new Date().getTime() : '';

		if(time)
		console.log( 'time' );

		// Create a new script element
		var script_element = document.createElement('script');

		// Set its source to the JSONP API
		script_element.src = api + '?_jsonp=' + callback + params + cache;

		console.log(script_element.src);

		// Stick the script element in the page <head>
		document.getElementsByTagName('head')[0].appendChild(script_element);

	}


	function postImage() {

		console.log('weweew');

		var time = '&noCache=' + new Date().getTime();

		var data = {
			file: 'wwwww'
		};

		$http.post( api + '/appp/media/upload', data).success( function( data, status, headers ) {

			console.log(data);

		});

	}

	return {

		getAppData: function(location) {

			return $http({
			  url: location,
			  method: 'GET'
			});

		},

		getAuthToken: function( credentials ) {
          return $http.post( api + '/request', credentials );
		},

		getPost: function( api, id ) {
			getData( api + '/posts/' + id, 'DETAIL_CALLBACK', '', true );
		},

		getPage: function( api, id ) {
			getData( api + '/pages/' + id, 'PAGE_CALLBACK', '' );
		},

		getAllPost: function( api ) {
			getData( api + '/posts/', 'POST_CALLBACK', '' );
		},

		getCatPost: function( api, cat, list_content ) {
			getData( api + '/posts/', 'POST_CALLBACK', '&filter[category_name]=' + cat );
		},

		getCptPost: function( api, cat, list_content ) {
			getData( api + '/posts/', 'POST_CALLBACK', '&type=' + cat );
		},

		getAllMedia: function( api, filter ) {
			console.log(filter);
			getData( api + '/appp/media/', 'MEDIA_CALLBACK', '&filter=' + filter );
		},

		getMedia: function( api, id ) {
			getData( api + '/appp/media/' + id, 'MEDIA_MODAL_CALLBACK', '' );
		},

		postImage: function() {

			var time = new Date().getTime();

			var data = {
				file: 'wwwww',
				time: time
			};

			$http.get( api + '/appp/media/upload'+ '?_jsonp=MEDIA_UPLOAD_CALLBACK', { params: data } ).success( function( data, status, headers ) {
				console.log(data);
			});

		}

	} ///return

});
