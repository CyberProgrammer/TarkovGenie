const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveData: (data) => ipcRenderer.invoke('save-data', data),
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog')
});