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

function selectVoca() {
  const vocaIndex = Math.floor(Math.random() * words.length);
  return words[vocaIndex];
}

const selectedVoca = selectVoca();

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
