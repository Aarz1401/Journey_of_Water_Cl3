document.addEventListener('DOMContentLoaded', function() {
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
});

