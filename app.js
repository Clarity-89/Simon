/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //assign jquery objs to vars
    var yellow = $('.yellow'), blue = $('.blue'), green = $('.green'), red = $('.red');
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
    /* function playChoices(arr) {
     arr.forEach(function (el, i) {
     console.log(el);
     setInterval(function () {
     el.delay(1000 * i).animate({opacity: 1}, 1000, function () {

     el.removeAttr('style');

     });
     }, 500);
     });
     }*/
    function playChoices(arr) {
        var i = 0;

        function myLoop() {
            setTimeout(function () {
                var el = arr[i];
                el.animate({opacity: 1}, 800, function () {
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

    //function to run the game
    function runGame() {
        computerChoices.push(randomChoice(sectors));
        playChoices(computerChoices);
    }

    $('#start').on('click', function () {
        runGame();
    });
});
