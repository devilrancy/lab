app.controller('AppCtrl', function( $scope, $ionicModal, $timeout, $location, TemplateLoader, DataLoader, $templateCache, $rootScope, $stateParams ) {

	// reloads app and busts cache
	$scope.reloadApp = function() {
		if ( window.cache ) {
			window.cache.clear( success, error );
		}
		window.location.reload();
	}

	// cache busting
	var success = function(status) {
        console.log('Message: ' + decodeURI(status) );
    }

    var error = function(status) {
        console.log('Error: ' + decodeURI(status) );
    }

	// resume event listener
	document.addEventListener( 'resume', onResume, false );

	// check app api on resume
	function onResume() {
		var data = DataLoader.getAppData(api2);
		var localdata = JSON.parse( localStorage.getItem('localData') );

	    data.success( function( data, status, headers, config ) {

		    localStorage.setItem( 'localData', JSON.stringify( data ) );

			if( data['meta']['app_update_version'] === localdata['meta']['app_update_version'] ) return;

	    	APPDATA = data;
	        pushData(data);
	    });

	    data.error( function( data, status, headers, config ) {
	        console.log('update failed!');
	    });
	}

	// gets app-data.js file
	$scope.loadAppData = function() {

		if( localStorage.getItem('localData') ) {
			var data = JSON.parse( localStorage.getItem('localData') );
			APPDATA = data;
		    pushData(data);
		} else {
			var data = DataLoader.getAppData(app_data);
			data.success( function( data, status, headers, config ) {
		    	APPDATA = data;
		        pushData(data);
		        onResume();
		    });

		    data.error( function( data, status, headers, config ) {
		        console.log('Loading data failed!');
		    });
		}

    }

	// pushes app-data.js file data to app
	var pushData = function( json ) {

	    angular.forEach( json.menus.items, function(item) {
	       if( item.icon ){
	         $scope.menuItemClass = 'item-icon-left';
	       }
	    });

		$scope.menus = json;

		// load css into head
		var background = json['meta']['design']['toolbar_background'];
		var color = json['meta']['design']['toolbar_color'];
		var toolbar = '.bar-reactor { background-color:' + background + '; border-bottom:' + background + '; } .bar-reactor h1, .bar-reactor .button { color: ' + color + '; }'
		var customCSS = json['meta']['design']['custom_css'];

		$rootScope.styles = toolbar + '  ' + customCSS ;
		$scope.apptitle = json['meta']['name'];

		// iad display
		if( 'on' === json['meta']['iad'] ) {

			console.log( 'iad ready');

			setTimeout(function() {

			    if ( window.plugins && window.plugins.iAd ) {
			        window.plugins.iAd.createBannerView(
			                {
			            'bannerAtTop': false,
			            'overlap': false,
			            'offsetTopBar' : false
			                }, function() {
			                    window.plugins.iAd.showAd( true );
			                }, function(){
			                    console.log( "failed to create ad view" );
			                });
			    } else {
			        console.log('iAd plugin not available/ready.');
			    }

		    }, 3000);

		}

	}

	// gets menu id on tap
	$scope.menuID = function(id) {
		pageID = id;
		isMenuTap = true;
		console.log(id);
	}


	$scope.loadMore = function() {

			setTimeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
			}, 500);

	};

});
