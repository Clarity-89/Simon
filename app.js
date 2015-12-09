/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //assign jquery objects to vars
    var yellow = $('.yellow'), blue = $('.blue'), green = $('.green'), red = $('.red'),
        countScreen = $('.count span'), sector = $('.sector'), message = $('.alert');

    //Variable to keep track of the game's progress
    var count = 0;

    // Load sounds
    var sounds = {
        green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        error: new Audio('audio/error.wav')
    };

    // Track animation and sound speed
    var soundTempo, animationTempo;

    // Play sound based on the element provided and set its tempo
    function playSound(sector) {
        var targetSector = sector.attr('class').split(' ')[1]; //get the name of the element's second class
        sounds[targetSector].playbackRate = soundTempo;
        sounds[targetSector].play();
    }

    // Stop all playing sounds
    function stopSound() {
        for (var sound in sounds) {
            if (sounds.hasOwnProperty(sound) && !sounds[sound]) {
                sounds[sound].pause();
            }
        }
    }

    // Variable to keep track of the index of current element in computerChoices array
    var index = 0;

    // Keep track of the game state to allow waiting for user's clicks
    var started = true;

    // Array of all the class names for the sectors
    var sectors = [green, yellow, red, blue];

    // Arrays for user's and computer choices
    var userChoices = [], computerChoices = [];

    // Get a random element from an array
    function randomChoice(arr) {
        var i = Math.ceil(Math.random() * arr.length - 1);
        return arr[i];
    }

    // 'Play' the choices from an array
    function playChoices(arr) {
        var i = 0;

        function myLoop() {
            setTimeout(function () {
                var el = arr[i];
                playSound(el);
                el.animate({opacity: 1}, animationTempo, function () {
                    el.removeAttr('style');
                    stopSound();
                });
                i++;
                if (i < arr.length) {
                    myLoop();
                }
            }, animationTempo)
        }

        myLoop();
    }

    // Animate user's selection and add it to the respective array
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

    // Check for the game state and wait till the player makes choices
    setInterval(function () {
        if (!started) {
            computerMove();
        }
    }, 1000);

    // Choose a random sector and play it
    function computerMove() {
        userChoices = [];
        computerChoices.push(randomChoice(sectors));
        count++;
        // Increase animation and sound speed depending on the count
        soundTempo = count < 5 ? 1 : count >= 5 && count < 9 ? 1.5 : count >= 9 && count < 13 ? 2 : 2.5;
        animationTempo = count < 5 ? 1000 : count >= 5 && count < 9 ? 750 : count >= 9 && count < 13 ? 500 : 450;
        playChoices(computerChoices);
        countScreen.hide().text(count).fadeIn();
        started = true;
    }

    $('#start').on('click', function () {
        if (count === 0) {
            started = false;
        }
    });

    // Reset the game
    $('#reset').on('click', function () {
        started = true;
        count = 0;
        countScreen.text(count);
        userChoices = [];
        computerChoices = [];
    });

    // Highlight a sector when pressed on and attach onclick event
    sector.mousedown(function () {
        if (started) {
            $(this).animate({opacity: 1});
        }
    }).mouseup(function () {
        if (started) {
            $(this).animate({opacity: 0.4});
        }
    }).click(userMove);
});
