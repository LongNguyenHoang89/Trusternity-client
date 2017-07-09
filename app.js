const { app, BrowserWindow, Tray } = require('electron')
var trusternity = require('./logic/trusternity')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  _dirname = process.cwd();
  win = new BrowserWindow({ width: 800, height: 600 });
  //win.setMenu(null);

  win.on('minimized', () => {
    win.hide();
  })

  win.on('closed', () => {
    win = null
  })

  createTray();
  trusternity.SetupIpc(win);
  win.loadURL(`file://${_dirname}/main.html`);  
}

function createTray() {
  const tray = new Tray('./img/icon.png')
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
  win.on('show', () => {
    tray.setHighlightMode('always')
  })
  win.on('hide', () => {
    tray.setHighlightMode('never')
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})