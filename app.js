/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //assign jquery objs to vars
    var yellow = $('.yellow'), blue = $('.blue'), green = $('.green'), red = $('.red'),
        countScreen = $('.count span'), sector = $('.sector'), message = $('.alert');

    // Variable to keep track of the index of current element in computerChoices array
    var index = 0;

    //Variable to keep track of the game's progress
    var count = 0;

    //Keep track of the game state to allow waiting for user's clicks
    var started = true;

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
        if (started) {
            if (userChoices.length < computerChoices.length) {
                userChoices.push($(this));
                if ($(this)[0].className != computerChoices[index][0].className) {
                    userChoices = [];
                    index = 0;
                    message.show().removeClass('alert-success').addClass('alert-danger').text('Incorrect. Try again!');
                    setTimeout(function () {
                        message.hide();
                    }, 500);
                    //repeat choices
                    playChoices(computerChoices);
                } else {
                    index++;
                    if (userChoices.length === computerChoices.length) {
                        message.show().removeClass('alert-danger').addClass('alert-success').text('Correct!');
                        setTimeout(function () {
                            message.hide();
                        }, 700);
                        index = 0;
                        started = false;
                    }
                }
            } else {
                started = false;
            }
        }
    }

    //Check for the game state and wait till the player makes choices
    setInterval(function () {
        if (!started) {
            runGame();
        }
    }, 1000);

    //Function to run the game
    function runGame() {
        userChoices = [];
        computerChoices.push(randomChoice(sectors));
        count++;
        countScreen.hide().text(count).fadeIn();
        playChoices(computerChoices);
        started = true;
    }

    $('#start').on('click', function () {
        started = false;
    });

    //Reset the game
    $('#reset').on('click', function () {
        started = true;
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
    }).click(userMove);
});
