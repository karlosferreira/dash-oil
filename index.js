const { app, BrowserWindow, Menu, ipcMain } = require('electron');

try {
    require('electron-reloader')(module);
} catch (err) {
    console.log('Erro ao ativar o hot reload:', err);
}

let mainWindow;

app.whenReady().then(() => {
    Menu.setApplicationMenu(null); // Remove o menu superior

    mainWindow = new BrowserWindow({
        width: 350,
        height: 150,
        show: false,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Necessário para o ipcRenderer funcionar
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.loadFile('public/index.html');
});

// Evento para abrir nova janela e fechar a inicial
ipcMain.on('load-main-screen', () => {
    let mainScreen = new BrowserWindow({
        resizable: true,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    setTimeout(() => {
        mainWindow.close();
        mainScreen.loadFile('public/main.html');
    }, 100);
    
    setTimeout(() => {
        mainScreen.maximize();
    }, 1000);
    
    // setTimeout(() => {
    //     mainScreen.show();
    // }, 3000);
});
