/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //assign jquery objs to vars
    var yellow = $('.yellow'), blue = $('.blue'), green = $('.green'), red = $('.red'),
        countScreen = $('.count'), sector = $('.sector');
    var index = 0;

    //Variable to keep track of the game's progress
    var count = 0;

    //Keep track of the game state to allow waiting for user's clicks
    var started = false;

    //An array of all the class names for the sectors
    var sectors = [green, yellow, red, blue];

    // Arrays for user's and computer choices
    var userChoices = [], computerChoices = [];

    //function to get a random element from an array
    function randomChoice(arr) {
        var i = Math.ceil(Math.random() * arr.length - 1);
        return arr[i];
    }

    //function to 'play' the choices from an array
    function playChoices(arr) {
        var i = 0;

        function myLoop() {
            setTimeout(function () {
                var el = arr[i];
                el.animate({opacity: 1}, 1000, function () {
                    el.removeAttr('style');
                });
                i++;
                if (i < arr.length) {
                    myLoop();
                }
            }, 1000)
        }

        myLoop();
    }

    //Animate user's selection and add it to the respective array
    function userMove() {
        console.log('index', userChoices.length);
        if (userChoices.length < computerChoices.length) {
            userChoices.push($(this));
            if ($(this)[0].className != computerChoices[index][0].className) {
                alert('WRONG!');
                index = 0;
                playChoices(computerChoices);
                userMove();
            } else {
                index++;
                runGame();
            }
        }
    }

    var runner = setInterval(function () {
        if (!started) {
            runGame();
            clearInterval(runner);
        }
    }, 1000);

    //Function to run the game
    function runGame() {
        userChoices = [];
        computerChoices.push(randomChoice(sectors));
        count++;
        countScreen.text(count);
        playChoices(computerChoices);
        started = true;
    }

    $('#start').on('click', function () {
        runGame();
    });

    //Reset the game
    $('#reset').on('click', function () {
        sector.off();
        count = 0;
        countScreen.text(count);
        userChoices = [];
        computerChoices = [];
    });

    //Highlight a sector when pressed on and attach onclick event
    sector.mousedown(function () {
        $(this).animate({opacity: 1});
    }).mouseup(function () {
        $(this).animate({opacity: 0.4});
    }).onclick(userMove);
});
