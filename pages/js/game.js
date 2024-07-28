document.querySelector('#others__how').addEventListener('click', function () {
  document.querySelector('.play_popup').style.display = 'flex';
});

document.querySelector('.content_close').addEventListener('click', function () {
  document.querySelector('.play_popup').style.display = 'none';
});

document.querySelector('#others__pause').addEventListener('click', function () {
  document.querySelector('.pause_popup').style.display = 'flex';
});

document.querySelector('.content_close').addEventListener('click', function () {
  document.querySelector('.pause_popup').style.display = 'none';
});

document.querySelector('#pause__resume').addEventListener('click', function () {
  document.querySelector('.pause_popup').style.display = 'none';
  // 게임을 다시 시작하는 로직을 추가할 수 있습니다
});

document.querySelector('#pause__quit').addEventListener('click', function () {
  // 게임을 종료하는 로직을 추가할 수 있습니다
});
