app.controller('DetailCtrl', function( $scope, $stateParams, $ionicModal, $timeout, TemplateLoader, DataLoader ) {

 	var postID = $stateParams.postID;
 	var page = $stateParams.page;

 	var sharing = false;

 	console.log(pageID);

	for (var i = 0; i < APPDATA['menus']['items'].length; i++) {

		if( APPDATA['menus']['items'][i]['page_id'] === pageID && APPDATA['menus']['items'][i]['page_data']['sharing'] === 'on' ) {
			sharing = true;
		}

		if( null === pageID && APPDATA['menus']['items'][0]['page_data']['sharing'] === 'on' ) {
			sharing = true;
		}


	}

    DETAIL_CALLBACK = function( json ) {
    	console.dir(json);

		$scope.data = json;

		$scope.title = json['title'];
		$scope.link = json['link'];
		$scope.content = json['content'];
		$scope.author = json['author']['first_name'];

		if ( json['featured_image'] !== null) {
			if (typeof json['featured_image']['attachment_meta']['file'] !== "undefined") {
				$scope.featured = url + '/wp-content/uploads/' + json['featured_image']['attachment_meta']['file'];
			}
		}

		$scope.socialsharing = sharing;
		$scope.$apply();
	};

	$scope.getPage = function() {
		return TemplateLoader.getThePage( page );
	}

	$timeout( function(){
		DataLoader.getPost(api, postID);
	}, 500);


	$scope.shareThis = function( title, link ) {

		window.plugins.socialsharing.share( title, null, null, link).then(function(result) {
		      console.log('Share success ' + result);
		  }, function(err) {
		      alert('We messed that up, sorry! Please try again');
		});

	}

	$scope.openBrowser = function(link) {
		window.open(link, '_blank');
	}

});
