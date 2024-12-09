const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveData: (data) => ipcRenderer.invoke('save-data', data),
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    getProfiles: async () => await ipcRenderer.invoke('get-profiles'),
    getSaveLocation: async () => await ipcRenderer.invoke('get-save-location'),
    updateReduxState: (state) => ipcRenderer.invoke('update-redux-state', state),
    deleteSave: (filePath) => ipcRenderer.invoke('delete-save', filePath),
});