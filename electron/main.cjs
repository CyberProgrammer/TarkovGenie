const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

let profileData = {};
let hideoutData = {};
let taskData = {};
let itemsData = {};


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        minWidth: 375,
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

    console.log("App is ready!");
});

app.on('before-quit',  () => {
    console.log("Exiting...");
    const saveDir = getSaveDirectory();

    const filePath = path.join(saveDir, `${profileData.username}-autosave.json`);
    const data = { profileData, hideoutData, taskData, itemsData };
    console.log('Autosave complete.');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
})

// Helper to get the correct save directory
function getSaveDirectory() {
    const isDev = process.env.NODE_ENV === 'development';
    const userDataDir = app.getPath('userData');
    return isDev ? path.join(__dirname, 'saves') : path.join(userDataDir, 'saves');
}

// Delete file from path
ipcMain.handle('delete-save', async (event, filePath) => {
    try{
        console.log("Deleting save...", filePath);
        fs.rmSync(filePath);
        return {success: true};
    } catch (err){
        console.error("Error deleting save location:", err);
        throw err;
    }
})

// Return default save location
ipcMain.handle('get-save-location', async () => {
    try{
        const location= getSaveDirectory()
        return location;
    } catch (err){
        console.error("Error getting save location:", err);
        throw err;
    }
})

// Get any profiles found at the default save location
ipcMain.handle('get-profiles', async () => {
    try{
        const saveDir = getSaveDirectory();
        const files = fs.readdirSync(saveDir);

        const filePromises = files.map(async (file) => {
            try {
                const stats = await fs.promises.stat(saveDir + '\\' + file);
                return {
                    file: file,
                    creationDate: stats.birthtime,
                };
            } catch (err) {
                console.error("Error getting file stats for", file, err);
                return null;  // In case of error, return null and filter later
            }
        });

        const results = await Promise.all(filePromises);
        return results.filter(result => result !== null);
    } catch (err){
        console.error("Error reading profiles:", err);
        throw err;
    }
})

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
    } catch (err) {
        console.error("Error saving data:", err);
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

ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return { success: true, data: fileContent };
    } catch (err) {
        console.error('Error reading file:', err);
        return { success: false, message: "Failed to read file!" };
    }
});

// Update state
ipcMain.handle('update-redux-state', async (event, state) => {
    try{
        profileData = state.profileData;
        hideoutData = state.hideoutData;
        taskData = state.taskData;
        itemsData = state.itemsData;

        const data = {profileData, hideoutData, taskData, itemsData};

        return { success: true, message: `Data updated...` };

    } catch (err){
        return { success: false, message: "Failed to update data!" };
    }


});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

