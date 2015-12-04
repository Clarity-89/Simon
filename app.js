/**
 * Created by alex on 12/2/15.
 */
$(document).ready(function () {

    //An array of all the class names for the sectors
    var sectors = ['.green', '.yellow', '.red', '.blue'];

    // Arrays for user's and computer choices
    var userChoices = [], computerChoices = [];


    //function to get a random element from an array
    function randomChoice(arr) {
        var i = Math.ceil(Math.random() * arr.length - 1);
        return arr[i];
    }

    console.log(randomChoice(sectors));
});
