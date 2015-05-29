// the basement
// game controller

app.controller('gameCtrl', function($http, $scope, $rootScope, httpFactory){
    $scope.player = {};
    $scope.opponent = {};
    var _flopCard = 0; // 0 = pregame no flop | 1 = flop | 2 = turn | 3 = river
    var _deckPos = 0;
    var _deck = [];
    var flop = [];
    var playerCards = [];
    var oppCards = [];
    var players = {
           
    }

    var HANDS = {
        HIGH_CARD: 0,
        PAIR: 1,
        TWO_PAIR: 2,
        THREE_OF_A_KIND: 3,
        STRAIGHT: 4,
        FLUSH: 5,
        FULL_HOUSE: 6,
        FOUR_OF_A_KIND: 7,
        STRAIGHT_FLUSH: 8,
        ROYAL_FLUSH: 9
    }

    $scope.init = function(){
        _flopCard = 0;
        _deckPos = 0;
        _deck = [];
        flop = [];
        playerCards = [];
        oppCards = [];
    }
    
    $scope.knock = function(){
      
    }
  
    $scope.fold = function(){
  
    }
  
    $scope.call = function(){
  
    }
  
    $scope.betRaise = function(){
       _flopCard++;
       console.log(_deckPos);
       if(_flopCard == 2){
            // turn
            flop[3] = $scope.parseCard(_deck[_deckPos]);
            $(".flop").append('<img id="flop4" class="card" src="Content/img/deck/' + flop[3].rank + flop[3].suit + '.png" />');
        }

        if(_flopCard == 3){
            // river
            flop[4] = $scope.parseCard(_deck[_deckPos]);
            $(".flop").append('<img id="flop5" class="card" src="Content/img/deck/' + flop[4].rank + flop[4].suit + '.png" />');
            $scope.rankHands();
        }
    }
  
    $scope.newGame = function(){
        $(".flop").empty();
        $(".opponent").empty();
        $(".player").empty();
        $scope.init();

        httpFactory.get("NewGame")
        .success(function(data, status, headers, config) {
            _deck = data;
            _flopCard = 1;

            console.log(_deck)

            flop[0] = $scope.parseCard(_deck[0]);
            flop[1] = $scope.parseCard(_deck[1]);
            flop[2] = $scope.parseCard(_deck[2]);

            $(".flop").append('<img id="flop1" class="card" src="Content/img/deck/' + flop[0].rank + flop[0].suit + '.png" />');
            $(".flop").append('<img id="flop2" class="card" src="Content/img/deck/' + flop[1].rank + flop[1].suit + '.png" />');
            $(".flop").append('<img id="flop3" class="card" src="Content/img/deck/' + flop[2].rank + flop[2].suit + '.png" />');


            playerCards[0] = $scope.parseCard(_deck[3]);
            playerCards[1] = $scope.parseCard(_deck[5]);
                
            $(".player").append('<img id="card1" class="card" src="Content/img/deck/' + playerCards[0].rank + playerCards[0].suit + '.png" />');
            $(".player").append('<img id="card2" class="card" src="Content/img/deck/' + playerCards[1].rank + playerCards[1].suit + '.png" />');

            oppCards[0] = $scope.parseCard(_deck[4]);
            oppCards[1] = $scope.parseCard(_deck[6]);

            $(".opponent").append('<img id="oppCard1" class="card" src="Content/img/deck/' + oppCards[0].rank + oppCards[0].suit + '.png" />');
            $(".opponent").append('<img id="oppCard2" class="card" src="Content/img/deck/' + oppCards[1].rank + oppCards[1].suit + '.png" />');

        })
        .error(function(data, status, headers, config) {
            $("#status").text("ERR " + data);
        });
    }
  
    $scope.parseCard = function(cardNum){
        _deckPos++ // increment deck position - counter to "remove" a card from deck
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

    $scope.rankHands = function(){
        flop.forEach(function (card) {
            playerCards.forEach(function(pCard){
                // check pairs
                if(pCard.rank == card.rank){
                    
                } 
                 
            });
        });
    }

});