document.querySelector('#others__how').addEventListener('click', function () {
  document.querySelector('.play_popup').style.display = 'flex';
});

document.querySelector('.content_close').addEventListener('click', function () {
  document.querySelector('.play_popup').style.display = 'none';
});
