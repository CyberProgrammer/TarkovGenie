const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        minWidth: 350,
        height: 1080,
        minHeight: 800,
        icon: path.join(__dirname, 'assets/icons/logo.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false
        },
    });

    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
});

// Helper to get the correct save directory
function getSaveDirectory() {
    const isDev = process.env.NODE_ENV === 'development';
    const userDataDir = app.getPath('userData');
    return isDev ? path.join(__dirname, 'saves') : path.join(userDataDir, 'saves');
}

// Respond to save request from renderer process
ipcMain.handle('save-data', async (event, data) => {
    try {
        const saveDir = getSaveDirectory();

        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
            console.log(`Directory created at: ${saveDir}`);
        }

        const filePath = path.join(saveDir, `${data.profileData.username}.json`);

        // Write the data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return { success: true, message: `Data saved successfully to ${filePath}` };
    } catch (error) {
        console.error("Error saving data:", error);
        return { success: false, message: "Failed to save data!" };
    }
});


// Handle open file dialog from renderer process
ipcMain.handle('open-file-dialog', async () => {
    const saveDir = getSaveDirectory();

    console.log("Opening file dialog in directory:", saveDir);

    try {
        const result = await dialog.showOpenDialog({
            defaultPath: saveDir, // Start in the saves directory
            filters: [{ name: 'JSON Files', extensions: ['json'] }],
            properties: ['openFile'],
        });

        if (!result.canceled && result.filePaths.length > 0) {
            return result.filePaths[0]; // Return the selected file path
        } else {
            return null; // User canceled the file selection
        }
    } catch (err) {
        console.error('Error opening file dialog:', err);
        return null;
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

