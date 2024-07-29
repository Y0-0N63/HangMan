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
});

// 게임 종료
let wrong = 0;
const maxWrong = 6;

function gameOver() {
  const findAll = Array.from(
    document.querySelectorAll('.right__blank span')
  ).every((span) => span.textContent !== '_');

  if (findAll) {
    showGameOver('You Win!');
  } else if (wrong > maxWrong) {
    showGameOver('Game Over');
  }
}

function showGameOver(message) {
  const popup = document.querySelector('.popup__gameOver');
  const messageElem = document.querySelector('.gameOver__message');
  messageElem.textContent = message;
  document.querySelector('.play__popup').style.display = 'flex';
  popup.style.display = 'flex';
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
document.querySelector('#others__how').addEventListener('click', function () {
  document.querySelector('.play__popup').style.display = 'flex';
  document.querySelector('.popup__howToPlay').style.display = 'flex';
});

document
  .querySelector('.howToPlay__close')
  .addEventListener('click', function () {
    document.querySelector('.popup__howToPlay').style.display = 'none';
    document.querySelector('.play__popup').style.display = 'none';
  });

document.querySelector('#others__pause').addEventListener('click', function () {
  document.querySelector('.play__popup').style.display = 'flex';
  document.querySelector('.popup__pause').style.display = 'flex';
});

document.querySelector('.pause__close').addEventListener('click', function () {
  document.querySelector('.popup__pause').style.display = 'none';
  document.querySelector('.play__popup').style.display = 'none';
});

document.querySelector('#pause__resume').addEventListener('click', function () {
  document.querySelector('.popup__pause').style.display = 'none';
  document.querySelector('.play__popup').style.display = 'none';
});

document
  .querySelector('.gameOver__close')
  .addEventListener('click', function () {
    document.querySelector('.popup__gameOver').style.display = 'none';
    document.querySelector('.play__popup').style.display = 'none';
  });
