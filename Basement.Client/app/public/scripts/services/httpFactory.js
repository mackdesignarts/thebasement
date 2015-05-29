// HTTP factory

'use strict';

app.factory('httpFactory', function($http){
    var obj = {};
    obj.get = function(service){        
        return $http.get('/api/' + service);
    } 
    obj.post = function(service, body){
        return $http.post('/api/' + service, body);
    }
    return obj;
});


