import {importData} from "@customTypes/types.ts";

const handleImport = async (setImportedData: (data: importData) => void, saveLocation?: string) => {
    try {
        let filePath = "";
        let response;

        if (!saveLocation) {
            // If no save location is provided, open a file dialog to select a file
            filePath = await window.electron.openFileDialog();

            if (!filePath) {
                console.log("No file selected");
                return;
            }

            // Read the file content via the readFile method
            response = await window.electron.readFile(filePath);
        } else {
            // If save location is provided, read the file directly from it
            response = await window.electron.readFile(saveLocation);
        }

        if (!response.success) {
            console.error("Error reading file:", response.message);
            return;
        }

        const fileText = response.data;

        if (!fileText) {
            console.log("File content is empty or undefined");
            return;
        }

        // Parse the JSON data from the file
        const jsonData = JSON.parse(fileText);
        console.log("Imported data:", jsonData);
        setImportedData(jsonData);
    } catch (error) {
        console.error("Error importing data:", error);
    }
};

export default handleImport;