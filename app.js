const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const paintColor = document.querySelector('#paintColor');
const paintRange = document.querySelector('#paintRange');
const paintMode = document.querySelector('#paintMode');
const paintSave = document.querySelector('#paintSave');

const INIT_COLOR = "#2c2c2c";
const INIT_BG = "#fff"
const INIT_CANVAS_SIZE = 500;
const INIT_LINE_WIDTH  = 2.5;

canvas.width = INIT_CANVAS_SIZE;
canvas.height = INIT_CANVAS_SIZE;
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_BG;
ctx.lineWidth = INIT_LINE_WIDTH;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false; // 그리기 시작
let filling = false; // 페인트 모드(배경색상 칠하기)

const onMouseMove = (event) => {
  const { offsetX, offsetY } = event;
  if(!painting) {
    ctx.beginPath(); // Path 시작
    ctx.moveTo(offsetX, offsetY); // 시작점 이동 (펜 옮기기, Path 이동)
  } else {
    ctx.lineTo(offsetX, offsetY); // Path 점 찍기 (x, y 지정된 위치에 선 그리기)
    ctx.stroke(); // 그려놓은 점(Path)들 -> 선으로 만들기
  }
}

const startPaint = (event) => {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    painting = true;
  }
}

const stopPaint = () => {
  painting = false;
}

const onClickColor = (event) => {
  const target = event.target;
  if (target.classList.contains('controls_color')) {
    const color = target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    event.currentTarget.querySelector('.on').classList.remove('on');
    target.classList.add('on');
  }
}

const handleRangeChange = (event) => {
  const size = event.currentTarget.value;
  ctx.lineWidth = size;
}

const handleModeChange = (event) => {
  console.log('@')
  const target = event.currentTarget;
  if (filling) {
    filling = false;
    target.innerText = 'Fill';
  } else {
    filling = true;
    target.innerText = 'Paint';
  }
}

const onClickSave = () => {
  if (canvas) {
    const img = canvas.toDataURL('image/jpeg', 1.0); // dataurl 로 canvas 변경
    // 다운로드 할 수 있도록 a 태그 임시생성
    const link = document.createElement('a');
    link.href = img;
    link.download = `PaintJS[🎨]`;
    link.click();
  }
}

const handelCM = (event) => {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPaint);
  canvas.addEventListener('mouseup', stopPaint);
  canvas.addEventListener('mouseleave', stopPaint);
  canvas.addEventListener('contextmenu', handelCM);
}

if (paintColor) {
  paintColor.addEventListener('click', onClickColor);
}

if (paintRange) {
  paintRange.addEventListener('input', handleRangeChange);
}

if (paintMode) {
  paintMode.addEventListener('click', handleModeChange);
}

if (paintSave) {
  paintSave.addEventListener('click', onClickSave)
}


// 처음실행시 초기화 (브라우져 호환)
const init = () => {
  if (paintRange) paintRange.value = INIT_LINE_WIDTH;
}
init();