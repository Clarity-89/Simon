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
    function playChoices(arr) {
        arr.forEach(function (el, i) {
            el.delay(1000 * i).animate({opacity: 1}, 1000, function () {
                el.animate({opacity: 0.6});
            });
        });
    }

    playChoices(sectors);

});
