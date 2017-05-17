import 'angular';
import '@uirouter/angularjs';

//imports

    // CORE

    // BOOKLET
    import './booklet/service';
    import './booklet/controller';

    const dependencies = [
        // CORE
        'ui.router',
        // BOOKLET
        'booklet-service',
        'booklet-controller',
    ];

// ROUTING

(app => {
    
    app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
//        $httpProvider.interceptors.push('Interceptor');
        $urlRouterProvider.otherwise('/');
        
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/views/booklet.html',
            controller: 'Booklet',
            controllerAs: 'booklet',
            resolve: {
                locations: Booklet => Booklet.getLocations(),
                tickets: Booklet => Booklet.getTicketNames()
            }
        });
        
//        $stateProvider.state('login', {
//            url: '/',
//            templateUrl: '',
//            controller: '',
//            controllerAs: ''
//        });
        
        //SET HTML5 MODE TO TRUE
        $locationProvider.html5Mode(true);
    });
    
})(angular.module('app', dependencies))