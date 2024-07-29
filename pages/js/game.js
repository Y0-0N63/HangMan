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
  'SPACIAL',
  'TRAVEL',
  'SERENITY',
  'ADVENTURE',
];

// 단어를 랜덤으로 선택하는 함수
function selectVoca() {
  const vocaIndex = Math.floor(Math.random() * words.length);
  return words[vocaIndex];
}

// 선택된 단어
const selectedVoca = selectVoca();
let guessedLetters = [];

// 단어 길이만큼의 '_'를 생성하여 표시하는 함수
function makeBlank() {
  const blanks = document.querySelector('.right__blank');
  blanks.innerHTML = '';

  for (let i = 0; i < selectedVoca.length; i++) {
    const span = document.createElement('span');
    span.textContent = '_';
    blanks.appendChild(span);
  }
}

// 페이지가 로드되면 단어의 길이만큼 '_' 표시
document.addEventListener('DOMContentLoaded', function () {
  makeBlank();
});

// 알파벳 버튼 클릭 시 처리 함수
function clickAlphabet(event) {
  const button = event.target;
  const letter = button.textContent;

  // 버튼 비활성화
  button.disabled = true;

  // 단어에 문자가 포함되어 있는지 확인
  if (selectedVoca.includes(letter)) {
    // 맞은 경우
    document.querySelectorAll('.right__blank span').forEach((span, index) => {
      if (selectedVoca[index] === letter) {
        span.textContent = letter;
      }
    });
    // 버튼 스타일 변경
    button.style.backgroundColor = 'black';
    button.style.color = 'blue';
  } else {
    // 틀린 경우
    button.style.backgroundColor = 'black';
    button.style.color = 'red';
  }
}

// 버튼 클릭 이벤트 리스너 추가
document.querySelectorAll('.keyboard__buttons button').forEach((button) => {
  button.addEventListener('click', clickAlphabet);
});

// 기타 이벤트 리스너들
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

document.querySelector('#pause__quit').addEventListener('click', function () {
  // TODO: Add logic for quitting the game
});
