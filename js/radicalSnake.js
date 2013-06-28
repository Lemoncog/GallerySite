

var gTileArray;
var gTilesX;
var gTilesY;
var gTileWidthHeight;

var apples;
var snakeTailSegments;
var addedTail = false;

function Actor( aX, aY ){
    this.element;
    this.x = aX;
    this.y = aY;
};

var snake = new Actor( 0, 0 );

function buildSnakeWorld( width, height , tilesX, tilesY ) {

    //Make size of snake tail?
    snakeTailSegments = new Array();

    gTileArray = new Array(tilesX);
    gTileWidthHeight = width/tilesX;
    gTilesX = tilesX;
    gTilesY = tilesY;

    for( var x = 0; x < tilesX; x++) {

        gTileArray[x] = new Array(tilesY);

        for(y = 0; y < tilesY; y++) {
            gTileArray[x][y] = 0;
        }
    }

    var snakeElement = "<img id='snake' src='img/snake.png'>";
    var snakeWorld = "<div id='world' class='snakeWorld'>" + snakeElement + "</div>";

    snake.element = $( snakeElement );

    return snakeWorld;
}

function addSnakeTail() {
    //Position on end
    var newX = 0;
    var newY = 0;
    if(snakeTailSegments.length > 0) {
        var tailLast = snakeTailSegments[snakeTailSegments.length-1];
        newX = tailLast.x;
        newY = tailLast.y;
    }else {
        newX = snake.x;
        newY = snake.y;
    }

    var snakeTail = new Actor( 0 , 0 );
    snakeTail.x = newX;
    snakeTail.y = newY;

    var tailElement = $("<img class='snakeBits' src='img/snake.png'>");
    tailElement.css({'position' : 'relative', 'left' : 0, 'top' : 0});
    snakeTail.element = tailElement;

    $( "#world" ).append(tailElement);

//    tailElement.animate( {
//        left:newX*gTileWidthHeight,
//        top: newY*gTileWidthHeight
//    }, 200, "linear");

    snakeTailSegments.push(snakeTail);
}

function addApple( x, y ) {
    gTileArray[x][y] = 1;

   var apple = $("<img class='apple' src='img/apple.png'>");

    $( "#world" ).append(apple);

    apple.animate( {
       left: x*gTileWidthHeight,
       top: y*gTileWidthHeight
    }, 200, "linear");
}

function translateSnake( dirX, dirY ) {

    var snakeX = snake.x+dirX;
    var snakeY = snake.y+dirY;

    $( "#snake" ).animate( {
        left: snakeX * gTileWidthHeight,
        top: snakeY * gTileWidthHeight
    }, 200, "linear", snakeMoved);

    for(var i = 0; i < snakeTailSegments.length; i++) {
        //Last tail Pos
        var newX;
        var newY;

        if(i+1 < snakeTailSegments.length)
        {
            newX = snakeTailSegments[i+1].x;
            newY = snakeTailSegments[i+1].y;
        }else
        {
            newX = snake.x;
            newY = snake.y;
        }

        var tail = snakeTailSegments[i];
        tail.element.animate( {
            left: newX * gTileWidthHeight,
            top: newY * gTileWidthHeight
        }, 200, "linear");

        tail.x = newX;
        tail.y = newY;
    }

    snake.x = snakeX;
    snake.y = snakeY;
}

function snakeMoved() {
    if(gTileArray[snake.x][snake.y] === 1) {
        //Nom, we got an apple.
        console.log("Snake ate an apple");

        //Add another apple, nom nom!
        addApple( Math.round(Math.random()*gTilesX), Math.round(Math.random()*gTilesY));

        addSnakeTail();
    }

    //Have we touched our tail?
}