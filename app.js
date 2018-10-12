const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')

let window = null;

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 800px
    width: 800,
    // Set the initial height to 600px
    height: 600,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#D6D8DC",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    // Add icon for the app
    icon: path.join(__dirname, 'assets/images/list.png')
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })
  window.setMenu(null);
  const template = [
    {
      label: 'view',
      submenu: [
        {
          label: 'Background Color',
          submenu: [
            {
              label: 'red',
              icon: 'assets/images/red.png',
              click: () => { window.webContents.send('color', '#ff1654') }
            },
            {
              label: 'blue',
              icon: 'assets/images/blue.png',
              click: () => { window.webContents.send('color', '#00B2FF') }
            },
            {
              label: 'dark blue',
              icon: 'assets/images/darkblue.png',
              click: () => { window.webContents.send('color', '#247ba0') }
            },
            {
              label: 'pastel red',
              icon: 'assets/images/pink.png',
              click: () => { window.webContents.send('color', '#FF686B') }
            }
          ]
        }
      ]
    },
    {
      label: "developer",
      click: () => {
        window.webContents.toggleDevTools();

      }
    }
  ]
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
})