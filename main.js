const { app, BrowserWindow, screen, globalShortcut } = require('electron');
app.whenReady().then(() => {
  const b = screen.getPrimaryDisplay().workArea; // область без панели задач
  const win = new BrowserWindow({
    ...b, transparent: true, frame: false, alwaysOnTop: true, skipTaskbar: true,
    hasShadow: false, focusable: false, resizable: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true);
  win.setIgnoreMouseEvents(true); // клики проходят сквозь окно
  win.loadFile('index.html');
  const send = (ch, d) => { if (!win.isDestroyed()) win.webContents.send(ch, d); };
  setInterval(() => {
    const p = screen.getCursorScreenPoint();
    send('cursor', { x: p.x - b.x, y: p.y - b.y });
  }, 50);
  try { // глобальные клики и клавиши (необязательно)
    const { uIOhook } = require('uiohook-napi');
    let keys = [], cool = 0;
    uIOhook.on('click', () => send('click'));
    uIOhook.on('keydown', () => {
      const n = Date.now(); keys = keys.filter(t => n - t < 2000); keys.push(n);
      if (keys.length >= 6 && n > cool) { cool = n + 6000; send('typing'); }
    });
    uIOhook.start();
  } catch (e) { console.log('uiohook-napi недоступен: клики и печать не отслеживаются'); }
  globalShortcut.register('CommandOrControl+Shift+Q', () => app.quit());
});
app.on('window-all-closed', () => app.quit());
