
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>U Matter</title>
    <?php include 'header.php';?>
    <main>
            <section class="banner-internal">
                <div id="controls">
                    <label for="category">Category: </label>
                    <select id="category">
                        <option value="nature" selected>Nature</option>
                        <option value="yoga">Yoga</option>
                        <option value="motivation">Motivation</option>
                        <option value="flowers">Flowers</option>
                    </select>
                </div>
                <ul>
                    <li data-tab="nature" data-bg="assets/images/banner.jpg"></li>
                    <li data-tab="yoga" data-bg="assets/images/yoga.webp"></li>
                    <li data-tab="motivation" data-bg="assets/images/motivation.webp"></li>
                    <li data-tab="flowers" data-bg="assets/images/flower.jpg"></li>
                </ul>
                <div class="banner-heading">
                    <div class="container">
                        <h1 id="banner-title"></h1>
                    </div>
                </div>
            </section>
            <section class="video_SecA section">
                <div class="container">
                    <!-- <div id="controls">
                        <label for="category">Category: </label>
                        <select id="category">
                            <option value="nature" selected>Nature</option>
                            <option value="yoga">Yoga</option>
                            <option value="motivation">Motivation</option>
                            <option value="flowers">Flowers</option>
                        </select>
                    </div> -->
                    <div id="video-container" class="loading">Loading videos...</div>
                </div>
                <div class="popup" id="videoPopup">
                    <div class="popup-content">
                        <button class="close-btn" id="closePopup">×</button>
                        <video id="popupVideo" controls></video>
                    </div>
                </div>
            </section>
    </main>
       

    <?php include 'footer.php';?>
<script>
        const apiKey = 'sBjFVz6SO9V97g0NiDCI9MS941uf3KVfuwK91pWZztAloFgW1oobRtU6';
        const categorySelect = document.getElementById('category');
        const videoGallery = document.getElementById('video-container');
        const bannerListItems = document.querySelectorAll('.banner-internal li');
        const bannerTitle = document.getElementById('banner-title');

        async function fetchVideos(category = 'nature') {
            const url = `https://api.pexels.com/videos/search?query=${category}&per_page=12`;
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': apiKey
                }
            };

            videoGallery.classList.add('loading');
            videoGallery.innerHTML = 'Loading videos...';

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                displayVideos(data);
                updateBanner(category); // Add this to sync banner with video category
            } catch (error) {
                displayError(error.message);
            }
        }

        function displayVideos(data) {
            videoGallery.innerHTML = '';
            videoGallery.classList.remove('loading');

            if (data.videos?.length > 0) {
                data.videos.forEach(video => {
                    const videoItem = document.createElement('div');
                    videoItem.className = 'video-item';
                    videoItem.dataset.videoUrl = video.video_files[0].link;

                    const title = document.createElement('div');
                    title.className = 'video-title';
                    title.textContent = `Video by ${video.user.name}`;

                    const thumbnail = document.createElement('img');
                    thumbnail.src = video.image;
                    thumbnail.alt = `Thumbnail for video by ${video.user.name}`;

                    videoItem.appendChild(thumbnail);
                    videoItem.appendChild(title);
                    videoGallery.appendChild(videoItem);

                    videoItem.addEventListener('click', () => showPopup(videoItem.dataset.videoUrl));
                });
            } else {
                videoGallery.textContent = `No videos available for this category`;
            }
        }

        function displayError(error) {
            videoGallery.classList.remove('loading');
            videoGallery.classList.add('error');
            videoGallery.textContent = `Error: ${error}`;
        }

        // New function to update banner based on category
        function updateBanner(category) {
            // Remove active class from all li elements
            bannerListItems.forEach(item => item.classList.remove('active'));

            // Find matching li based on data-tab
            const matchingItem = Array.from(bannerListItems).find(
                item => item.getAttribute('data-tab') === category
            );

            if (matchingItem) {
                // Add active class to matching item
                matchingItem.classList.add('active');
                
                // Set background image
                const bgImage = matchingItem.getAttribute('data-bg');
                document.querySelector('.banner-internal').style.backgroundImage = `url(${bgImage})`;
            }
            bannerTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        }

        // Popup functionality
        const popup = document.getElementById('videoPopup');
        const popupVideo = document.getElementById('popupVideo');
        const closePopup = document.getElementById('closePopup');

        function showPopup(videoUrl) {
            popupVideo.src = videoUrl;
            popup.style.display = 'flex';
            popupVideo.play();
        }

        closePopup.addEventListener('click', () => {
            popupVideo.pause();
            popupVideo.src = '';
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popupVideo.pause();
                popupVideo.src = '';
                popup.style.display = 'none';
            }
        });

        // Event listener for category change
        categorySelect.addEventListener('change', (e) => {
            fetchVideos(e.target.value);
        });

        // Make banner items clickable too
        bannerListItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.getAttribute('data-tab');
                categorySelect.value = category; // Sync dropdown
                fetchVideos(category); // Fetch videos for this category
            });
        });

        // Initial fetch with default 'nature'
        document.addEventListener('DOMContentLoaded', () => fetchVideos('nature'));
</script>
