/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //assign jquery objs to vars
    var yellow = $('.yellow'), blue = $('.blue'), green = $('.green'), red = $('.red'),
        countScreen = $('.count'), sector = $('.sector');

    //Variable to keep track of the game's progress
    var count = 0;

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
        sector.mousedown(function () {
            $(this).animate({opacity: 1});
        }).mouseup(function () {
            $(this).animate({opacity: 0.4});
        });
    }

    //function to run the game
    function runGame() {
        computerChoices.push(randomChoice(sectors));
        count++;
        countScreen.text(count);
        playChoices(computerChoices);
        userMove();
    }


    $('#start').on('click', function () {
        runGame();
    });

    //Reset the game
    $('#reset').on('click', function () {
        count = 0;
        countScreen.text(count);
        userChoices = [];
        computerChoices = [];
    });
});
