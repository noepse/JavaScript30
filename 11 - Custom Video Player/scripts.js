// Get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')

const screenSizer = player.querySelector('.full-screen');


// Build functions

function togglePlay(){
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : 'II';
    toggle.textContent = icon;
}

function skip(){
    // console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration * 100);
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function adjustScreen(){
    if (document.fullscreenElement === null){
        video.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
}

// Hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);



toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false;

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mousedown', ()=> mousedown = false);

screenSizer.addEventListener('click', adjustScreen)

