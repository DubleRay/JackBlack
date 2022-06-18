var gameField;
var newGame;
var gamersScore;
var dillersScore;
var playersCards;
var dillerCards;
var more;
var enough;
var winer;
var bj;
window.onload = function(){
    gameField = document.getElementById('GameField');
    newGame = document.getElementById('NewGame');
    gamersScore = document.getElementById('GamersScore');
        gamersScore.value = gamersScore.innerText;
    dillersScore = document.getElementById('DillersScore');
        dillersScore.value = dillersScore.innerText;
    playersCards = document.getElementById('PlayersCards');
        playersCards.value = playersCards.innerText;
    dillerCards = document.getElementById('DillersCards');
        dillerCards.value = dillerCards.innerText;
    more = document.getElementById('More');
    enough = document.getElementById('Enough');
    winer = document.getElementById('Winer');
        winer.value = winer.innerText;

    newGame.addEventListener('click',ShowGameField);
    more.addEventListener('click',playerChoiceMore);
    enough.addEventListener('click',playerChoiceEnough);
}

function ShowGameField(e){
    gameField.style.display='table';
    e.target.style.display='none'
    
    bj = new BlackJack("Player");
    bj.StartGame();
}


function playerChoiceMore(){
    bj.Morecards();
    }

function playerChoiceEnough(){
    bj.DillersTurn();
    }
    
























class Deck{
    constructor(){
        this.cards = [];
        let spices = ["♥", "♠", "♦", "♣"];
        let values = [
            {value: "two", score: 2},
            {value: "three", score: 3},
            {value: "four", score: 4},
            {value: "five", score: 5},
            {value: "six", score: 6},
            {value: "seven", score: 7},
            {value: "eight", score: 8},
            {value: "nine", score: 9},
            {value: "ten", score: 10},
            {value: "king", score: 10},
            {value: "quine", score: 10},
            {value: "ace", score: 11},
            {value: "jack", score: 10}
        ]

        for(let i = 0; i<spices.length; i++){
            for(let j = 0; j<values.length; j++){
                let cardValue = values[j];
                this.cards.push(new Card(cardValue.value, cardValue.score, spices[i]));
            }
        }
    }

    get Cards(){
        return this.cards;
    }

    GetRandomCard(){
        let randomIndex = Math.floor(Math.random() * this.cards.length);
        let resultCard = this.cards[randomIndex];
        this.cards.splice(randomIndex,1);
        return resultCard;
    }
}

class Gambler{
    constructor(name){
        this.hand = [];
        this.score = 0;
        this.name = name;
    }

    get Hand(){
        return this.hand;
    }
    
    get Score(){
        return this.score;
    }

    get Name(){
        return this.name;
    }

    TakeCard(card){
        this.hand.push(card);
        this.score+=card.score;
    }

    Choice(x){
        return new Promise((resolve) => {
         let result
            if (x===1){
                result = true
            }
            else if (x===0){
                result = false;
            }
            resolve(result)
        })
    }
}

class Card{
    constructor(value, score, spice){
        this.value = value;
        this.score = score;
        this.spice = spice;
    }

    get Value(){
        return this.value;
    }

    get Score(){
        return this.score;
    }
    
    get Spice(){
        return this.spice;
    }

    get CardName(){
        return this.spice + " " + this.value;
    }
}

class BlackJack{
    constructor(name){
        this.Gamer = new Gambler(name);
        this.Diller = new Gambler("Diller");
        this.Deck = new Deck();
    }


        StartGame(){
        console.log("Game start");
        console.log("The player: " + this.Gamer.name);

        //Игрок получает карты//

        let firstPlayerCard = this.Deck.GetRandomCard();
        this.Gamer.TakeCard(firstPlayerCard);

        let secondPlayerCard = this.Deck.GetRandomCard();
        this.Gamer.TakeCard(secondPlayerCard);

        if (firstPlayerCard.value == "ace" && secondPlayerCard.value == "ace"){
            this.Gamer.score=21
        }
        gamersScore.innerText = ( this.Gamer.Name + "'s score: " + this.Gamer.Score);
        let handString = "";
        for(let i = 0; i<this.Gamer.Hand.length; i++){
            let handCard = this.Gamer.Hand[i];
            handString += handCard.CardName + ", ";
        }

        playersCards.innerText = (handString);

        if (this.Gamer.score > 21){34
            return winer.innerText = ("Game over Gamers overdose Diller won!")
        }
        else if (this.Gamer.score == 21){
            return winer.innerText = ("BlackJack!"+" "+"Player:"+this.Gamer.name+" "+"Win!")
            
        }
    }
        DillersTurn(){
        //Диллер получает карты//

        let firstDillerCard = this.Deck.GetRandomCard();
        this.Diller.TakeCard(firstDillerCard);

        let secondDillerCard = this.Deck.GetRandomCard();
        this.Diller.TakeCard(secondDillerCard);
        
        dillersScore.innerText = ( "Diller's score: " + this.Diller.Score);
        
        let dillerStartCards = "";
        for(let i = 0; i<this.Diller.Hand.length; i++){
            let dillerHandCard = this.Diller.Hand[i];
            dillerStartCards += dillerHandCard.CardName + ", ";
        }

        dillerCards.innerText = (dillerStartCards);

        if (firstDillerCard.value == "ace" && secondDillerCard.value == "ace"){
            this.Diller.score=21
        }
        if (this.Diller.score > 21){
            return winer.innerText = ("Game over "+this.Diller.name+" won!")
        }
        else if (this.Diller.score == 21){
            return winer.innerText = ("BlackJack! Player:"+this.Diller.name+" "+"Win!")
        }
        else{
            while(this.Diller.score<17)
            {
                let additionalDillerCard = this.Deck.GetRandomCard();
                this.Diller.TakeCard(additionalDillerCard);
                if (this.Diller.score>21)
                    return winer.innerText =("Dillers overdose Game over "+this.Gamer.name+" won!")
            }
        }

        dillersScore.innerText = ( "Diller's score: " + this.Diller.Score);
        
        let dillerHandString = "";
        for(let i = 0; i<this.Diller.Hand.length; i++){
            let dillerHandCard = this.Diller.Hand[i];
            dillerHandString += dillerHandCard.CardName + ", ";
        }

        dillerCards.innerText = (dillerHandString);

        //Резульаты игры//

        if (this.Gamer.score > this.Diller.score){
            return winer.innerText =("Game over "+this.Gamer.name+" won!");
        }
        else if (this.Gamer.score == this.Diller.score){
            return winer.innerText = ("Game over Dead heat" );
        }
        else if (this.Gamer.score < this.Diller.score){
            return winer.innerText =("Game over "+this.Diller.name+" won!");
        }
    }

    Morecards(){


        let additionalPlayerCard = this.Deck.GetRandomCard();
        this.Gamer.TakeCard(additionalPlayerCard);
        gamersScore.innerText = (this.Gamer.Name + "'s score: " + this.Gamer.Score);
        let playerHandString = "";
        for(let i = 0; i<this.Gamer.Hand.length; i++){
            let playerHandCard = this.Gamer.Hand[i];
            playerHandString += playerHandCard.CardName + ", ";
        }
        playersCards.innerText = (playerHandString);

        if (this.Gamer.score > 21){
            return winer.innerText = ("Game over Gamers overdose Diller won!")
        }
        else if (this.Gamer.score == 21){
            return winer.innerText = ("BlackJack! "+this.Gamer.name+" "+"Win!")
        }
        
}
}