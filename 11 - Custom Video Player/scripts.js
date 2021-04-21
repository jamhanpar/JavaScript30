/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay(e) {
    // alternative #1
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();

    // alternative #2 - handles click
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }

    // alternative #3 - needs some work to incorporate the spacebar
    // if (e.keyCode === 32 && video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }    
}

function updateButton() {
    const icon = this.paused ? "▶" : "〡〡";
    toggle.textContent = icon;
    // console.log('update the button');
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.name);
    console.log(this.value);
    console.log(video);

    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function videoResize() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {/* IE11 */
      video.msRequestFullscreen();
    }
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

// added play and pause when spacebar is clicked to my solution
window.addEventListener("keydown", togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// create full screen functionality
const fullscreenButton = document.querySelector('.fullscreen');
fullscreenButton.addEventListener('click', videoResize);