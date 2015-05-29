// the basement
// game controller

app.controller('gameCtrl', function($http, $scope, $rootScope, httpFactory){
    $scope.player = {};
    $scope.opponent = {};
    var _deck = [];
    
    $scope.knock = function(){
      
    }
  
    $scope.fold = function(){
  
    }
  
    $scope.call = function(){
  
    }
  
    $scope.betRaise = function(){
      
    }
  
    $scope.newGame = function(){
        $(".flop").empty();
        $(".opponent").empty();
        $(".player").empty();

        httpFactory.get("NewGame")
        .success(function(data, status, headers, config) {
            _deck = data;
            console.log(_deck)

            var flop1 = $scope.parseCard(_deck[0]);
            var flop2 = $scope.parseCard(_deck[1]);
            var flop3 = $scope.parseCard(_deck[2]);

            $(".flop").append('<img id="flop1" class="card" src="Content/img/deck/' + flop1.rank + flop1.suit + '.png" />');
            $(".flop").append('<img id="flop2" class="card" src="Content/img/deck/' + flop2.rank + flop2.suit + '.png" />');
            $(".flop").append('<img id="flop3" class="card" src="Content/img/deck/' + flop3.rank + flop3.suit + '.png" />');


            var card1 = $scope.parseCard(_deck[3]);
            var card2 = $scope.parseCard(_deck[5]);
                
            $(".player").append('<img id="card1" class="card" src="Content/img/deck/' + card1.rank + card1.suit + '.png" />');
            $(".player").append('<img id="card2" class="card" src="Content/img/deck/' + card2.rank + card2.suit + '.png" />');

        })
        .error(function(data, status, headers, config) {
            $("#status").text("ERR " + data);
        });
    }
  
    $scope.parseCard = function(cardNum){
        var _suit = cardNum / 13;
        var _rank = cardNum % 13;
        var suit, rank;
        // suits
        if(_suit <= 1){
            // hearts  
            suit = "H";
        }

        if(_suit <= 2 && _suit > 1){
            // diamonds
            suit = "D";
        }

        if(_suit <= 3 && _suit > 2){
            // clubs
            suit = "C";
        }

        if(_suit <= 4 && _suit > 3){
            // spades
            suit = "S";
        }
        // rank
        if(_rank == 1){
            rank = "A";          
        } else if(_rank == 11){
            rank = "J";
        } else if(_rank == 12){
            rank = "Q";
        } else if(_rank == 0){
            rank = "K";
        } else {
            rank = _rank.toString();          
        }

        return {
        suit: suit,
        rank: rank    
        }
    }

});