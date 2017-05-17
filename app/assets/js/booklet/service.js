(app => {
    
    app.factory('Booklet', ($http, $q) => {
        return {
            
            getLocations: () => $http.get('/data/locations.json').then(d => d.data),
            
            getTicketNames: () => $http.get('/data/tickets.json').then(d => d.data)
            
        }
    })
    
})(angular.module('booklet-service', []))
