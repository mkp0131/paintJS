# 바닐라 JS로 그림판 만들기(nomad corders)

## ELETRON

- 일렉트론 설치

```js
npm i -D electron // 일렉트론 설치
npm i -D @electron-forge/cli && npx electron-forge import // 배포를 위한 forge/cli 설치 및 세팅
```

- package.json 세팅

```json
{
  "main": "main.js", // 일렉트론 메인 파일
  "productName": "PainJS", // 앱을 출시했을때 이름
  "scripts": {
    "start": "electron .", // electron-forge 를 설치하지 않았을시 electron 으로 현재 폴더를 실행.
  }
  // electron-forge 설치시 config 속성이 생성됨
  "config": {
    "forge": {
      "packagerConfig": {
        "icon": "./icon.icns" // 프로그램 icon 등록
      },
  }
  // ...some code
}
```

- main.js 에 일렉트론 코드를 작성

```js
// 일렉트론 import
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');

// 일렉트론 앱 생성
const createWindow = () => {
  // 윈도우 생성(크롬 브라우져?)
  const win = new BrowserWindow({
    width: 800,
    height: 800,
  });

  // 메뉴 구성
  const template = [
    {
      label: 'View',
      // role 은 기본 시스템 메뉴,
      // type: 'separator' 는 <hr> 같이 라인을 생성
      submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
    },
    {
      label: 'View2',
      submenu: [
        {
          label: 'Save Paint',
          // 자바스크립트 click 이벤트 위에 생성한 위도우에 webContents 에 접근하여 등록되어있는 함수를 실행.
          click: () => {
            win.webContents.executeJavaScript(`onClickSave()`);
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Reload Paint',
          click: () => {
            win.webContents.executeJavaScript(`window.location.reload()`);
          },
        },
      ],
    },
  ];

  // 메뉴 구성을 메뉴로 생성
  const customMenu = Menu.buildFromTemplate(template);

  // 메뉴를 앱에 세팅
  Menu.setApplicationMenu(customMenu);

  // 위에 만든 위도우에 html 을 로드 (순서중요! 코드들이 다 로드 된다음에 index.html 을 보여줌)
  win.loadFile('index.html');
};

// 위에 생성한 코드 실행
app.whenReady().then(() => {
  createWindow();
});
```
