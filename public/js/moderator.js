const music = new Audio();
music.src = '/api/v1/file/9ae7345e-08e4-4fe0-ab0b-90ccd04b98ff';

$(document).ready(function() {
    $("#playsong").click(function() {
        music.play();
    });
});