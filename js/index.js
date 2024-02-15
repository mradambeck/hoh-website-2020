function showVideo() {
  const logo = document.querySelector(".logo");
  const video = document.querySelector(".video");

  video.innerHTML = `
<iframe
  class="youtube-iframe"
  src="https://www.youtube.com/embed/uw6M5uzlX2A"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
  `;

  logo.classList.add("hidden");
  video.classList.remove("hidden");
}
