// How To Play? 버튼 클릭 시
document.querySelector('#others__how').addEventListener('click', function () {
  document.querySelector('.play__popup').style.display = 'flex';
  document.querySelector('.popup__howToPlay').style.display = 'flex';
});

// How To Play 팝업의 X 버튼 클릭 시
document
  .querySelector('.howToPlay__close')
  .addEventListener('click', function () {
    document.querySelector('.popup__howToPlay').style.display = 'none';
    document.querySelector('.play__popup').style.display = 'none'; // 전체 팝업 닫기
  });

// Pause 버튼 클릭 시
document.querySelector('#others__pause').addEventListener('click', function () {
  document.querySelector('.play__popup').style.display = 'flex';
  document.querySelector('.popup__pause').style.display = 'flex';
});

// Pause 팝업의 X 버튼 클릭 시
document.querySelector('.pause__close').addEventListener('click', function () {
  document.querySelector('.popup__pause').style.display = 'none';
  document.querySelector('.play__popup').style.display = 'none'; // 전체 팝업 닫기
});

// Resume 버튼 클릭 시
document.querySelector('#pause__resume').addEventListener('click', function () {
  document.querySelector('.popup__pause').style.display = 'none';
  document.querySelector('.play__popup').style.display = 'none'; // 전체 팝업 닫기
  // 게임을 다시 시작하는 로직을 추가할 수 있습니다
});

// Quit 버튼 클릭 시
document.querySelector('#pause__quit').addEventListener('click', function () {
  // 게임을 종료하는 로직을 추가할 수 있습니다
});
