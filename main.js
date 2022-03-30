const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
  });

  const template = [
    {
      label: 'View',
      submenu: [{ role: 'about' }, { role: 'quit' }],
    },
    {
      label: 'View2',
      submenu: [
        {
          label: 'Save Paint',
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

  const customMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(customMenu);

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});
