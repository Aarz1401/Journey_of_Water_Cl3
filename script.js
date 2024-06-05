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
    const buttonContainer = document.querySelector('.button-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const loadingScreen = document.getElementById('loading-screen');
    const videoContainer = document.querySelector('.video-container');
    let audioElement = null;

    const chapters = [
        { video: 'videos/Waves_Video.mp4', audio: '', title: 'The Flow of Life' },
        { video: 'videos/falling_drop.mp4', audio: 'audio/1_Birth.mp3', title: 'Chapter 1: Birth' },
        { video: 'videos/Children_playing.mp4', audio: 'audio/2_Childhood.mp3', title: 'Chapter 2: Child' },
        { video: 'videos/river.mp4', audio: 'audio/3_Adolescence.mp3', title: 'Chapter 3: Adolescence' },
        { video: 'videos/thunder.mp4', audio: 'audio/4_Adulthood.mp3', title: 'Chapter 4: Adulthood' },
        { video: 'videos/waterfall.mp4', audio: 'audio/5_Old_age.mp3', title: 'Chapter 5: Old Age' },
        { video: 'videos/clouds_floating.mp4', audio: 'audio/6_Renewal.mp3', title: 'Chapter 6: Renewal' }
    ];

    let currentChapter = 0;

    function updateChapter(index) {
        if (index < 0 || index >= chapters.length) return;
        currentChapter = index;

        const { video, audio, title } = chapters[index];

        // Update video source
        videoElement.src = video;
        videoElement.load();
        videoElement.play();

        // Update title
        sceneTitle.textContent = title;

        // Show or hide restart button
        restartButton.style.display = index === 0 ? 'none' : 'block';

        // Update audio
        if (audioElement) {
            audioElement.pause();
            audioElement = null;
        }
        if (audio) {
            audioElement = new Audio(audio);
            audioElement.play();
            progressBarContainer.style.display = 'block';
            audioElement.addEventListener('timeupdate', function() {
                const progress = (audioElement.currentTime / audioElement.duration) * 100;
                progressBar.style.width = progress + '%';
            });
        } else {
            progressBarContainer.style.display = 'none';
        }

        // Update buttons visibility
        prevButton.style.display = index > 0 ? 'block' : 'none';
        progressBar.style.display = index > 0 ? 'block' : 'none';

        // Next Button special case
        if (index < chapters.length - 1) {
            nextButton.innerHTML = 'Next';
        } else {
            nextButton.innerHTML = '';
            var anchor = document.createElement('a');
            anchor.href = 'index.html';
            anchor.textContent = 'Back to Home';
            anchor.style.color = 'white';
            anchor.style.textDecoration = 'none';
            nextButton.appendChild(anchor);
        }

        // Highlight the current chapter button
        highlightCurrentButton(index);
    }

    function highlightCurrentButton(index) {
        document.querySelectorAll('.chapter-button').forEach((button, idx) => {
            if (idx === index ) { // Adjusting for 0-based index
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    function preloadVideos(videos, callback) {
        let loadedCount = 0;
        const totalVideos = videos.length;

        videos.forEach((video, idx) => {
            const videoElement = document.createElement('video');
            videoElement.src = video.video;
            videoElement.preload = 'auto';
            videoElement.onloadeddata = () => {
                loadedCount++;
                console.log(`Video ${idx + 1} loaded (${loadedCount}/${totalVideos})`);
                if (loadedCount === totalVideos) {
                    callback();
                }
            };
            videoElement.onerror = (error) => {
                console.error(`Error loading video ${idx + 1}:`, error);
                loadedCount++;
                if (loadedCount === totalVideos) {
                    callback();
                }
            };
        });
    }

    document.querySelectorAll('.chapter-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            updateChapter(index );
        });
    });

    nextButton.addEventListener('click', function() {
        updateChapter(currentChapter + 1);
    });

    prevButton.addEventListener('click', function() {
        updateChapter(currentChapter - 1);
    });

    restartButton.addEventListener('click', function() {
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play();
        }
    });

    // Preload all videos and hide the loading screen when done
    preloadVideos(chapters, () => {
        loadingScreen.style.display = 'none';
        videoContainer.style.display = 'block';
        updateChapter(currentChapter);
    });
});


//For mouse cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
   
});






