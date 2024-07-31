const words = [
  'ADVENTURE',
  'BALANCE',
  'CIRCUITRY',
  'DYNAMICS',
  'ELECTRIFY',
  'ENLIGHTEN',
  'EXAMINER',
  'FANTASTIC',
  'FOREST',
  'HORIZON',
  'INTEGRATE',
  'JOURNALIST',
  'LIBRARY',
  'MYSTERIOUS',
  'NUMERICAL',
  'OPTIMIZE',
  'PERFORMANCE',
  'PHYSICAL',
  'RESEARCH',
  'TECHNIQUE',
  'UNIVERSE',
  'VARIABLE',
  'WILDERNESS',
  'ZEALOUSLY',
];

// 단어 출제
function selectVoca() {
  const vocaIndex = Math.floor(Math.random() * words.length);
  return words[vocaIndex];
}

const selectedVoca = selectVoca();

// 페이지가 로드되면 단어의 길이만큼 '_' 표시
function makeBlank() {
  const blanks = document.querySelector('.right__blank');
  blanks.innerHTML = '';

  for (let i = 0; i < selectedVoca.length; i++) {
    const span = document.createElement('span');
    span.textContent = '_';
    blanks.appendChild(span);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  makeBlank();
  setupQuitButton(); // 페이지가 로드된 후 quit 버튼 설정
  startTimer(); // 페이지가 로드될 때 타이머 시작
});

let wrong = 0;
const maxWrong = 9;
let timer;
let seconds = 0;
let isPaused = false;

// 게임 종료
function gameOver() {
  const findAll = Array.from(
    document.querySelectorAll('.right__blank span')
  ).every((span) => span.textContent !== '_');

  if (findAll) {
    showGameOver('You WIN! 😄🎉', true);
  } else if (wrong >= maxWrong) {
    showGameOver(`Game Over 😭 <br> Your word is… "${selectedVoca}"`, false);
  }
}

function showGameOver(message, win) {
  showPopup('.popup__gameOver', message, win);
}

// 알파벳 버튼 클릭
function clickAlphabet(event) {
  // 게임이 일시 정지 중일 때는 아무 동작도 하지 않음
  if (isPaused) return;

  const button = event.target;
  const letter = button.textContent;

  if (!button.classList.contains('buttons__alphabet')) return;
  button.disabled = true;

  if (selectedVoca.includes(letter)) {
    Array.from(document.querySelectorAll('.right__blank span')).forEach(
      (span, index) => {
        if (selectedVoca[index] === letter) {
          span.textContent = letter;
        }
      }
    );

    button.style.backgroundColor = '#0a0a0a';
    button.style.color = '#50adff';
  } else {
    button.style.backgroundColor = '#0a0a0a';
    button.style.color = '#ff696f';
    wrong++;
    drawHangman();
  }

  gameOver();
}

document.querySelectorAll('.keyboard__buttons button').forEach((button) => {
  button.addEventListener('click', clickAlphabet);
});

// 팝업창들
function showPopup(popupSelector, message, win) {
  // 타이머 중지
  stopTimer();

  // 모든 팝업 숨기기
  const popups = document.querySelectorAll('.play__popup > div');
  popups.forEach((popup) => (popup.style.display = 'none'));

  const popup = document.querySelector(popupSelector);
  if (popup) {
    if (message) {
      popup.querySelector('.gameOver__message').innerHTML = message;
    }

    // 현재 팝업만 보이게 하기
    document.querySelector('.play__popup').style.display = 'flex';
    popup.style.display = 'flex';
  }

  setupQuitButton();

  document
    .querySelector('#gameOver__restart')
    .addEventListener('click', function () {
      // 페이지 새로고침 (게임 재시작)
      location.reload();
    });
}

// quit
function setupQuitButton() {
  const quitSelectors = ['#gameOver__quit', '#pause__quit'];
  quitSelectors.forEach((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener('click', function () {
        window.location.href = 'index.html';
      });
    }
  });
}

// how to play?
document.querySelector('#others__how').addEventListener('click', function () {
  if (!isPaused) {
    stopTimer();
    isPaused = true;
  }
  showPopup('.popup__howToPlay');
});

document
  .querySelector('.howToPlay__close')
  .addEventListener('click', function () {
    hidePopup('.popup__howToPlay');
    if (isPaused) {
      startTimer();
      isPaused = false;
    }
  });

// pause and resume
document.querySelector('#others__pause').addEventListener('click', function () {
  if (!isPaused) {
    stopTimer();
    isPaused = true;
    showPopup('.popup__pause');
  }
});

document.querySelector('.pause__close').addEventListener('click', function () {
  hidePopup('.popup__pause');
});

document.querySelector('#pause__resume').addEventListener('click', function () {
  if (isPaused) {
    startTimer();
    isPaused = false;
    hidePopup('.popup__pause');
  }
});

document
  .querySelector('.gameOver__close')
  .addEventListener('click', function () {
    hidePopup('.popup__gameOver');
  });

// 팝업 숨기기
function hidePopup(popupSelector) {
  const popup = document.querySelector(popupSelector);
  if (popup) {
    popup.style.display = 'none';
    document.querySelector('.play__popup').style.display = 'none';
  }
}

// 타이머
function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  document.querySelector('.timer__display').textContent = `${String(
    minutes
  ).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function stopTimer() {
  clearInterval(timer);
}

const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function drawHangman() {
  // 좌표 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;

  // 바닥
  if (wrong > 0) {
    ctx.beginPath();
    ctx.moveTo(100, 650);
    ctx.lineTo(400, 650);
    ctx.stroke();
  }

  // 기둥
  if (wrong > 1) {
    ctx.beginPath();
    ctx.moveTo(150, 650);
    ctx.lineTo(150, 100);
    ctx.stroke();
  }

  // 사람을 매다는 ㄱ자 모양
  if (wrong > 2) {
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(250, 100);
    ctx.lineTo(250, 150);
    ctx.stroke();
  }

  // 머리
  if (wrong > 3) {
    ctx.beginPath();
    ctx.arc(250, 200, 50, 0, Math.PI * 2, true);
    ctx.stroke();
  }

  // 몸통
  if (wrong > 4) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(250, 400);
    ctx.stroke();
  }

  // 왼쪽 팔
  if (wrong > 5) {
    ctx.beginPath();
    ctx.moveTo(250, 270);
    ctx.lineTo(200, 350);
    ctx.stroke();
  }

  // 오른쪽 팔
  if (wrong > 6) {
    ctx.beginPath();
    ctx.moveTo(250, 270);
    ctx.lineTo(300, 350);
    ctx.stroke();
  }

  // 왼쪽 다리
  if (wrong > 7) {
    ctx.beginPath();
    ctx.moveTo(250, 400);
    ctx.lineTo(200, 500);
    ctx.stroke();
  }

  // 오른쪽 다리
  if (wrong > 8) {
    ctx.beginPath();
    ctx.moveTo(250, 400);
    ctx.lineTo(300, 500);
    ctx.stroke();
    gameOver(); // 오른쪽 다리가 그려지면 게임 실패
  }
}
