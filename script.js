/*document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.images');
    let currentAudio = null;
    let currentProgressBar = null;

    images.forEach(image => {
        image.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentProgressBar) {
                    currentProgressBar.style.width = '0%';
                    currentProgressBar.parentElement.style.display = 'none';
                }
            }

            currentAudio = new Audio(audioFile);
            currentProgressBar = this.querySelector('.progress-bar');
            currentProgressBar.parentElement.style.display = 'block';

            currentAudio.play();
            currentAudio.ontimeupdate = function() {
                const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
                currentProgressBar.style.width = percentage + '%';
            };

            currentAudio.onended = function() {
                currentProgressBar.style.width = '0%';
                currentProgressBar.parentElement.style.display = 'none';
            };
        });
    });
});*/

document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('video-element');
    const progressBar = document.querySelector('.progress-bar');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const restartButton = document.getElementById('restart-audio');
    const sceneTitle = document.getElementById('scene-title');
    let audioElement = null;

    document.querySelectorAll('.chapter-button').forEach(button => {
        button.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            const audioSrc = this.getAttribute('data-audio');
            const title = this.getAttribute('data-title');

            // Update video source
            videoElement.src = videoSrc;
            videoElement.load();
            videoElement.play();

            // Update title
            sceneTitle.textContent = title;

            // Stop and update audio
            if (audioElement) {
                audioElement.pause();
                audioElement = null;
            }

            audioElement = new Audio(audioSrc);
            audioElement.play();
            progressBarContainer.style.display = 'block';

            audioElement.addEventListener('timeupdate', function() {
                const progress = (audioElement.currentTime / audioElement.duration) * 100;
                progressBar.style.width = progress + '%';
            });

            restartButton.addEventListener('click', function() {
                audioElement.currentTime = 0;
                audioElement.play();
            });
        });
    });
});




