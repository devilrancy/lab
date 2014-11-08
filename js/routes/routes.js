
var APP_CALLBACK;
var POST_CALLBACK;
var DETAIL_CALLBACK;
var PAGE_CALLBACK;
var APPDATA;
var map_name;
var map_address;
var pageID = null;
var isMenuTap = false;


var app = angular.module('app', ['ionic'])

.run(function( $ionicPlatform, $http ) {

	$ionicPlatform.ready(function() {

		// Hide the accessory bar by default
		//(remove this to show the accessory bar above the keyboard for form inputs)
		if( window.Keyboard ) {
		  	window.Keyboard .hideKeyboardAccessoryBar(true);
		}

	});

})

.config(function( $stateProvider, $urlRouterProvider ) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "views/templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/",
      views: {
        'mainContent' :{
          templateUrl: "views/templates/page.html",
          controller: 'PageCtrl'
        }
      }
    })

    .state('app.page', {
      url: "/page/:page/:id",
      views: {
        'mainContent' :{
          templateUrl: "views/templates/page.html",
          controller: 'PageCtrl'
        }
      }
    })

    .state('app.detail', {
      url: "/:page/:postID",
      views: {
        'mainContent' :{
          templateUrl: "views/templates/detail.html",
          controller: 'DetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/');

});
