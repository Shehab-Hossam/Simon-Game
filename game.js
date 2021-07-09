function soundAndColor(color){

        var Sound = new Audio("sounds/"+color+".mp3");
        Sound.play();
        $("#"+color).addClass("pressed");

        setTimeout(function(){ $("#"+color).removeClass("pressed")}, 150);
}
function add (randomButton)
{
    $(".how").addClass("hide");
    var chosenColor = colorArray[randomButton];
    pressedButtons.push(chosenColor);
    pressedButtons.forEach(function(color, i) 
    {
        setTimeout(function() { soundAndColor(color); }, i * 500);
    });
}

function wrong(){

    $("body").addClass("game-over");

    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    setTimeout(function(){ $("body").removeClass("game-over"); }, 750);
}

function reset(){
    userPressedButtons = [];
    return userPressedButtons;
}

function resetAll(){
    userPressedButtons = [];
    pressedButtons = [];
    i = 0;
    count = 3;
    return userPressedButtons, pressedButtons, i, count;
}

 function check (userPressedButtons, pressedButtons)
{
    if (userPressedButtons.length == pressedButtons.length)
    {
    setTimeout(function(){
        if(JSON.stringify(userPressedButtons)==JSON.stringify(pressedButtons))
        {
            randomButton = Math.floor(Math.random() * 4);
            add(randomButton);
            $("#level-title").text("Level "+(parseInt(i)+1));
            i = i + 1;
            reset();
        }
        else
        {
            $("h1#level-title").text("Game Over Press on Start");
            $(".container").addClass("hide");
            $(".start").removeClass("hide");
             wrong();
             resetAll();
        }
    }, 500); 
    }
}

var pressedButtons = [];
var userPressedButtons = [];
var i = 0;
var colorArray = ["green","red","yellow","blue"];
var count = 3;

$(".start").on("click", function(){
    if (pressedButtons.length == 0)
    {
        $(".container").removeClass("hide");
        $(".start").addClass("hide");
        randomButton = Math.floor(Math.random() * 4);
        add(randomButton);
        $("#level-title").text("Level "+(parseInt(i)+1));
        $(".show").text("Show Full Pattern ("+count+" left)");
    }
}); 

$(".btn").on("click", function(){
    var detectedColor = $(this).attr("id");
    soundAndColor(detectedColor);
    userPressedButtons.push(detectedColor);
    check(userPressedButtons, pressedButtons);
});

$(".how").on("click", function(){
    alert("You have to click on keys as the shown pattern and you have 3 chances to see the pattern");
});

$(".show").on("click", function(){
    if (count>0)
    {
    pressedButtons.forEach(function(color, i) 
    {
        setTimeout(function() { soundAndColor(color); }, i * 500);
    });
    count -= 1;
    $(this).text("Show Full Pattern ("+count+" left)");
    }
});