const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const unzipper = require('unzipper');
const csvParser = require('csv-parser');

const app = express();
const port = 9100;


app.use(cors());


app.use(fileUpload());


const uploadDir = 'E:\\SH\\uploads';

const baseDir = 'E:\\XAMAPP\\htdocs\\test_site';


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


app.post('/upload', async (req, res) => {
    console.log('Received POST request to /upload');
    
    if (!req.files || !req.files.zip_file || !req.files.csv_file) {
        console.log('No files uploaded');
        return res.status(400).send('No files were uploaded.');
    }

    let zipFile = req.files.zip_file;
    let csvFile = req.files.csv_file;

    
    const zipFilePath = path.join(uploadDir, zipFile.name);
    const csvFilePath = path.join(uploadDir, csvFile.name);

    try {
   
        await zipFile.mv(zipFilePath);
        await csvFile.mv(csvFilePath);

        console.log('Files uploaded successfully!');

   
        const zipFileNameWithoutExt = path.parse(zipFile.name).name;

        // Process the uploaded files
        await processFiles(zipFilePath, csvFilePath, zipFileNameWithoutExt);

        res.send('Files processed and moved successfully!');
    } catch (err) {
        console.log('Error processing files:', err.message);
        res.status(500).send('Error processing files: ' + err.message);
    }
});

// Function to process uploaded files
async function processFiles(zipFilePath, csvFilePath, zipFileNameWithoutExt) {
    // Unzip the zip file into a directory named after the ZIP file (without extension)
    const extractedDir = path.join(uploadDir);
    await fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: extractedDir }))
        .promise();

    console.log('ZIP file unzipped successfully into:', extractedDir);
    const finextractedDir = path.join(extractedDir,zipFileNameWithoutExt);
    // Read and parse the CSV file
    const fileMappings = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                // Expecting columns: Name, Standard, Subject, Title
                const { Name, Standard, Subject, Title } = row;
                if (Name && Standard && Subject) {
                    fileMappings.push({ Name, Standard, Subject });
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    console.log('CSV file processed successfully. File mappings:', fileMappings);

    // Move files to their respective directories
    for (const { Name, Standard, Subject } of fileMappings) {
        const srcPath = path.join(finextractedDir, Name);
        const destDir = path.join(baseDir, Standard, Subject);

        // Ensure the destination directory exists
        await fs.ensureDir(destDir);

        const destPath = path.join(destDir, Name);

        // Move the file to the destination directory
        if (await fs.pathExists(srcPath)) {
            await fs.move(srcPath, destPath, { overwrite: true });
            console.log(`Moved ${Name} to ${destPath}`);
        } else {
            console.log(`File not found: ${srcPath}`);
        }
    }

    console.log('All files moved successfully.');
}

app.listen(port, () => {
    console.log(`Village server listening on port ${port}`);
});
