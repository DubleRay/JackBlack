const Diamonds = [2,3,4,5,6,7,8,9,10,10,10,10,11];
const Hearts = [2,3,4,5,6,7,8,9,10,10,10,10,11];
const Spades = [2,3,4,5,6,7,8,9,10,10,10,10,11];
const Clubs = [2,3,4,5,6,7,8,9,10,10,10,10,11];
function getcard(){
    var y = Diamonds.sort(() => Math.random()-0.5)
    var x = y[0];
 y.pop();
return x }
