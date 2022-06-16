function showVideo () {
  console.log('clicked');
  const logo = document.querySelector('.logo');
  const video = document.querySelector('.video');
  logo.classList.add('hidden');
  video.classList.remove('hidden');
};
