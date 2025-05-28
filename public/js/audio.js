const music = new Audio();
let isPlaying = false;

export async function loadMusic(filekey, coverImg, authorName, trackName) {
    try {
        music.src = '';
        await fetch(`/api/v1/file/${filekey}`)
            .then(response => response.blob())
            .then(blob => {
                music.src = URL.createObjectURL(blob);
            });
        
        $(".songImage").attr('src', `/api/v1/file/${coverImg}`);
        $(".music_player_name").text(trackName);
        $(".music_player_author").text(authorName);
    } catch (err) {
        console.log(err);
    }
};

export async function playMusic() {
    isPlaying = true;
    $('.playBtn').attr('src', './data/icons/pause.png');
    music.play();
};

export function pauseMusic() {
    isPlaying = false;
    $('.playBtn').attr('src', './data/icons/right.png');
    music.pause();
};

export function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
};

export function setProgressBar(e) {
    const width = $(".progress_bar")[0].clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
    console.log((clickX / width) * music.duration); // тут выводится правильное значение
    console.log(music.currentTime);                 // тут выводится ноль
};

export function setSoundBar(e) {
    const width = $('.music_player_sound_bar')[0].clientWidth;
    const clickX = e.offsetX;
    music.volume = (clickX / width);
    $('.music_player_volume')[0].style.width = `${music.volume*100}%`;
};

export function checkPlaying() {
    if (isPlaying) $('.playBtn').attr('src', './data/icons/pause.png');
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    $(".progress").css('width', `${progressPercent}%`);

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    $(".duration").text(`${formatTime(duration / 60)}:${formatTime(duration % 60)}`);
    $(".currentTime").text(`${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`);
};

music.addEventListener('timeupdate', updateProgressBar);




