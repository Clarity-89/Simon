/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //assign jquery objects to vars
    var yellow = $('.yellow'), blue = $('.blue'), green = $('.green'), red = $('.red'),
        countScreen = $('.count span'), sector = $('.sector'), message = $('.alert');

    // Load sounds
    var sounds = {
        green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        error: new Audio('audio/error.wav')
    };

    // Play sound based on the element provided
    function playSound(sector) {
        var targetSector = sector.attr('class').split(' ')[1]; //get the name of the element's second class
        sounds[targetSector].play();
    }

    //Stop all playing sounds
    function stopSound() {
        for (var sound in sounds) {
            if (sounds.hasOwnProperty(sound) && !sounds[sound]) {
                sounds[sound].pause();
            }
        }
    }

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
                playSound(el);
                el.animate({opacity: 1}, 1000, function () {
                    el.removeAttr('style');
                    stopSound();
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
        stopSound();
        var el = $(this);
        if (started) {
            if (userChoices.length < computerChoices.length) {
                userChoices.push(el);
                if (el[0].className != computerChoices[index][0].className) {
                    userChoices = [];
                    index = 0;
                    sounds.error.play();
                    message.removeClass('alert-success').addClass('alert-danger').text('Incorrect. Try again!').show();
                    setTimeout(function () {
                        message.fadeOut(200);
                    }, 1100);
                    playChoices(computerChoices); //repeat choices
                } else {
                    playSound(el);
                    index++;
                    if (userChoices.length === computerChoices.length) {
                        message.removeClass('alert-danger').addClass('alert-success').text('Correct!').show();
                        setTimeout(function () {
                            message.fadeOut(200);
                        }, 1100);
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
            computerMove();
        }
    }, 1000);

    //Choose a random sector and play it
    function computerMove() {
        userChoices = [];
        computerChoices.push(randomChoice(sectors));
        count++;
        playChoices(computerChoices);
        started = true;
        countScreen.hide().text(count).fadeIn();
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
