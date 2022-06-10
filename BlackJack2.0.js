
class Deck{
    constructor(){
        this.cards = [];
        let spices = ["hearts", "spades", "diamonds", "clubs"];
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

    Choice(){
    let promtresult = prompt("Take more?");
    if (promtresult==="yes") return true;
    else if (promtresult==="no") return false;
    else return null;
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

        let firstPlayercard = this.Deck.GetRandomCard();
        this.Gamer.TakeCard(firstPlayercard);

        let secondPlayercard = this.Deck.GetRandomCard();
        this.Gamer.TakeCard(secondPlayercard);

        if (firstPlayercard.value=="ace"&&secondPlayercard.value=="ace"){
            this.Gamer.score=21
        }
        console.log(this.Gamer.Name + "'s score: " + this.Gamer.Score);
        let handString = "";
        for(let i = 0; i<this.Gamer.Hand.length; i++){
            let handCard = this.Gamer.Hand[i];
            handString += handCard.CardName + ", ";
        }

        console.log(handString);

        if (this.Gamer.score > 21){
            return console.log("Game over Gamers overdose Diller won!")
        }
        else if (this.Gamer.score == 21){
            return console.log("BlackJack!"+" "+"Player:"+this.Gamer.name+" "+"Win!")
        }
        else{
            let resultCoice = this.Gamer.Choice();

            while(resultCoice==null)
            {
                console.log("Wrong answer baka choose yes or no!")
                resultCoice = this.Gamer.Choice();
            }
            while( resultCoice!= false && resultCoice!=null)
            { 

                let additionalPlayercard = this.Deck.GetRandomCard();
                this.Gamer.TakeCard(additionalPlayercard);
                console.log(this.Gamer.Name + "'s score: " + this.Gamer.Score);
                let PlayerhandString = "";
                for(let i = 0; i<this.Gamer.Hand.length; i++){
                    let PlayerhandCard = this.Gamer.Hand[i];
                    PlayerhandString += PlayerhandCard.CardName + ", ";
                }
        
                console.log(PlayerhandString);

                if (this.Gamer.score > 21){
                    return console.log("Game over Gamers overdose Diller won!")
                }
                else if (this.Gamer.score == 21){
                    return console.log("BlackJack! Player:"+this.Gamer.name+" "+"Win!")
                }
                
                resultCoice=this.Gamer.Choice();
            }
        }

        //Диллер получает карты//

        let firstDillercard = this.Deck.GetRandomCard();
        this.Diller.TakeCard(firstDillercard);

        let secondDillercard = this.Deck.GetRandomCard();
        this.Diller.TakeCard(secondDillercard);

        if (firstDillercard.value=="ace"&&secondDillercard.value=="ace"){
            this.Diller.score=21
        }
        if (this.Diller.score > 21){
            return console.log("Game over "+this.Diller.name+" won!")
        }
        else if (this.Diller.score == 21){
            return console.log("BlackJack! Player:"+this.Diller.name+" "+"Win!")
        }
        else{
            while(this.Diller.score<17)
            {
                let additionalDillercard = this.Deck.GetRandomCard();
                this.Diller.TakeCard(additionalDillercard);
                if (this.Diller.score>21)
                    return console.log("Dillers overdose Game over "+this.Gamer.name+" won!")
            }
        }

        console.log( "Diller's score: " + this.Diller.Score);
        
        let DillerhandString = "";
        for(let i = 0; i<this.Diller.Hand.length; i++){
            let DillerhandCard = this.Diller.Hand[i];
            DillerhandString += DillerhandCard.CardName + ", ";
        }

        console.log(DillerhandString);

        //Резульаты игры//

        if (this.Gamer.score > this.Diller.score){
            return console.log("Game over "+this.Gamer.name+" won!");
        }
        else if (this.Gamer.score == this.Diller.score){
            return console.log("Game over Dead heat" );
        }
        else if (this.Gamer.score < this.Diller.score){
            return console.log("Game over "+this.Diller.name+" won!");
        }
    }
}


var bj = new BlackJack("DubleRay");
bj.StartGame();