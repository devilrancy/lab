app.controller( 'PageCtrl', function( $scope, $sce, $http, $ionicModal, $ionicSlideBoxDelegate, $templateCache, $stateParams, $timeout, TemplateLoader, DataLoader, $compile, $rootScope ) {

	var id = $stateParams.id;
	var page = $stateParams.page;


	if( !page ) {
		$scope.isHome = true;
	}

	// this loads the proper component into page
	$scope.getPage = function() {
			return TemplateLoader.getThePage( page );
	}

	// this loads the proper component into page
	$scope.getHomePage = function() {
			if( !page && APPDATA ){
				page = APPDATA['menus']['items'][0]['page_data']['page_type'];
			}
			return TemplateLoader.getThePage( page );
	}


	$scope.loadPage = function() {

		// timeout while template loads then fill with data
		setTimeout(function() {

			console.log( APPDATA );

			for ( var i = 0; i < APPDATA['menus']['items'].length; i++ ) {

				if( APPDATA['menus']['items'][i]['page_id'] === id ){

					if( APPDATA['menus']['items'][i]['page_data']['slider'] === 'on' ){
						$scope.getSlider = function() {
							return 'views/components/slider.html';
						}
					}

					var cat = APPDATA['menus']['items'][i]['page_data']['taxonomy'];
					var list_content = APPDATA['menus']['items'][i]['page_data']['list_content'];
					var component = APPDATA['menus']['items'][i]['page_data']['page_type'];

					loadComponent( component, i, cat, list_content );

				}

			}

			if( $scope.isHome ){

					if( APPDATA['menus']['items'][0]['page_data']['slider'] === 'on' ){
						$scope.getSlider = function() {
							return 'views/components/slider.html';
						}
					}
					var cat = APPDATA['menus']['items'][0]['page_data']['taxonomy'];
					var list_content = APPDATA['menus']['items'][0]['page_data']['list_content'];
					var component = APPDATA['menus']['items'][0]['page_data']['page_type'];

					loadComponent( component, 0, cat, list_content );
			}


		}, 1000);

	}
	$scope.loadPage();


	// loads data into component
	var loadComponent = function( component, i, cat, list_content ) {


			switch( component ) {

				case 'text':

					$scope.title = APPDATA['menus']['items'][i]['page_data']['title'];
					$scope.html = APPDATA['menus']['items'][i]['page_data']['text_html'];;

				break;

				case 'list':

					if ( 'cpt' === list_content ) {
						DataLoader.getCptPost( api, cat, list_content );
					} else if( 'category' === list_content ) {
						DataLoader.getCatPost( api, cat, list_content );
					} else {
						DataLoader.getAllPost( api );
					}


					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';



				break;

				case 'cardlist':

					if ( 'cpt' === list_content ) {
						DataLoader.getCptPost( api, cat, list_content );
					} else if( 'category' === list_content ) {
						DataLoader.getCatPost( api, cat, list_content );
					} else {
						DataLoader.getAllPost( api );
					}

					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';

				break;

				case 'medialist':

					if ( 'cpt' === list_content ) {
						DataLoader.getCptPost( api, cat, list_content );
					} else if( 'category' === list_content ) {
						DataLoader.getCatPost( api, cat, list_content );
					} else {
						DataLoader.getAllPost( api );
					}


					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';

				break;

				case 'productlist':

					if ( 'cpt' === list_content ) {
						DataLoader.getCptPost( api, cat, list_content );
					} else if( 'category' === list_content ) {
						DataLoader.getCatPost( api, cat, list_content );
					} else {
						DataLoader.getAllPost( api );
					}


					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';

				break;

				case 'productlist2col':

					if ( 'cpt' === list_content ) {
						DataLoader.getCptPost( api, cat, list_content );
					} else if( 'category' === list_content ) {
						DataLoader.getCatPost( api, cat, list_content );
					} else {
						DataLoader.getAllPost( api );
					}


					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';

				break;

				case 'pagesite':

					DataLoader.getPage( api, id );

					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';

				break;

				case 'map':

					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';

					// todo: remove global variable
					map_name = APPDATA['menus']['items'][i]['page_data']['map_name'];
					map_address = APPDATA['menus']['items'][i]['page_data']['map_address'];

				break;

				case 'imagegrid':

					var filter = APPDATA['menus']['items'][i]['page_data']['gallery_tag'] || 'default';

					DataLoader.getAllMedia( api, filter );

					$scope.detail = APPDATA['menus']['items'][i]['page_data']['detail'] || 'default';


					//var template = '<button class="button button-icon icon ion-camera" ng-click="takeImage()"></button>';
					//var linkFn = $compile(template);
					//var content = linkFn($scope);

					//$scope.rightButtons = '<div id="imagebutton"></div>';



				break;
			}

			$scope.$apply();

			//var e = angular.element( document.getElementById('imagebutton') );
			//e.append(content);

	}

	imageButton = function() {}

    $scope.takeImage = function() {
		console.log('weweew');
		DataLoader.postImage();
	};

	// these are the api jsonp callback functions
    POST_CALLBACK = function( json ) {
    	console.log(json);
		$scope.posts = json;
		$scope.$apply();
		$ionicSlideBoxDelegate.update();
		isMenuTap = false;

	};

    PAGE_CALLBACK = function( json ) {
		$scope.title = json['title'];
		$scope.content = json['content'];
		$scope.author = json['author']['first_name'];

		$scope.$apply();
	};

	MEDIA_CALLBACK = function( json ) {
		console.log(json);

		$scope.images = json;
		$scope.$apply();
	};

	MEDIA_MODAL_CALLBACK = function( json ) {
		console.log(json);

		if (typeof json[0]['meta']['sizes']['thumbnail'] !== "undefined") {
			$scope.modalImage = json[0]['meta']['sizes']['thumbnail']['url'];
		}

		if (typeof json[0]['meta']['sizes']['medium'] !== "undefined") {
			$scope.modalImage = json[0]['meta']['sizes']['medium']['url'];
		}

		if (typeof json[0]['meta']['sizes']['large'] !== "undefined") {
			$scope.modalImage = json[0]['meta']['sizes']['large']['url'];
		}

		$scope.$apply();
	};

	MEDIA_UPLOAD_CALLBACK = function( json ) {
		console.log(json);
	};

	// image pop modal
	$ionicModal.fromTemplateUrl('views/templates/modal.html', {
	  	scope: $scope,
	  	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
		$scope.modalClass = 'image-modal';
	});

	$scope.openModal = function(id) {
		$scope.modalImage = false;
		$scope.modal.show();
		DataLoader.getMedia( api, id );
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	$scope.$on('$destroy', function() {
		$scope.modal.remove();

	});



});
