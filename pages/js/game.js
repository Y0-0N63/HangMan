const words = [
  'JUPITER',
  'EARTH',
  'PLANET',
  'GALAXY',
  'UNIVERSE',
  'MOUNTAIN',
  'OCEAN',
  'FOREST',
  'DESERT',
  'VOLCANO',
  'RADIANT',
  'EXAMINE',
  'JOURNAL',
  'MYSTERY',
  'LIBRARY',
  'HORIZON',
  'BALANCE',
  'DYNAMIC',
  'SPECIAL',
  'TRAVEL',
  'SERENITY',
  'ADVENTURE',
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
});

// 게임 종료
let wrong = 0;
const maxWrong = 6;

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
  }

  gameOver();
}

document.querySelectorAll('.keyboard__buttons button').forEach((button) => {
  button.addEventListener('click', clickAlphabet);
});

// 팝업창들
function showPopup(popupSelector, message, win) {
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

  // 버튼 클릭 시 동일한 행동을 하도록 이벤트 리스너 추가
  setupQuitButton();

  document
    .querySelector('#gameOver__restart')
    .addEventListener('click', function () {
      // 페이지 새로고침 (게임 재시작)
      location.reload();
    });
}

// 'quit' 버튼의 공통 동작을 설정하는 함수
function setupQuitButton() {
  // 버튼 선택자를 모두 명시
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

// 도움말 보기
document.querySelector('#others__how').addEventListener('click', function () {
  showPopup('.popup__howToPlay');
});

document
  .querySelector('.howToPlay__close')
  .addEventListener('click', function () {
    hidePopup('.popup__howToPlay');
  });

// 일시 정지 및 재개
document.querySelector('#others__pause').addEventListener('click', function () {
  showPopup('.popup__pause');
});

document.querySelector('.pause__close').addEventListener('click', function () {
  hidePopup('.popup__pause');
});

document.querySelector('#pause__resume').addEventListener('click', function () {
  hidePopup('.popup__pause');
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
