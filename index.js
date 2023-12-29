require("dotenv").config();
const fs = require("fs");
const {google} = require("googleapis");

const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID;

// Upload file to Google Drive
async function uploadFileToGoogleDrive() {
  try {
    // Step 1: Authenticate with Google Drive API using OAuth2
    const auth = new google.auth.GoogleAuth({
      keyFile: "./googleKey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    // Step 2: Create a Google Drive service object
    const drive = google.drive({ version: "v3", auth });

    // Step 3: Create a readable stream to upload file to Google Drive
    const fileMetadata = {
      name: "image.jpg",
      parents: [GOOGLE_API_FOLDER_ID],
    };

    // Step 4: Create a writable stream to upload file to Google Drive
    const media = {
      mimeType: "image/jpg",
      body: fs.createReadStream("./image.jpg"),
    };

    // Step 5: Upload file to Google Drive
    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    // console.log(res.data.id);
    return res.data.id;
  } catch (error) {
    console.log(error);
  }
}

// Delete file from Google Drive
async function deleteFileFromGoogleDrive(fileId) {
    try {
        // Step 1: Authenticate with Google Drive API using OAuth2
        const auth = new google.auth.GoogleAuth({
            keyFile: "./googleKey.json",
            scopes: ["https://www.googleapis.com/auth/drive"],
        });
        
        // Step 2: Create a Google Drive service object
        const drive = google.drive({ version: "v3", auth });

        // Step 3: Delete file from Google Drive
        const res = await drive.files.delete({
            fileId: fileId,
        });

        if(res){
            console.log("File deleted successfully");
        }else{
            console.log("Something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

// Update file on Google Drive
async function updateFileOnGoogleDrive(fileId) {
    try {
        // Step 1: Authenticate with Google Drive API using OAuth2
        const auth = new google.auth.GoogleAuth({
            keyFile: "./googleKey.json",
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        // Step 2: Create a Google Drive service object
        const drive = google.drive({ version: "v3", auth });

        // Step 3: Create a readable stream to upload file to Google Drive
        const fileMetadata = {
            name: "image.jpg",
            parents: [GOOGLE_API_FOLDER_ID],
        };

        // Step 4: Create a writable stream to upload file to Google Drive
        const media = {
            mimeType: "image/jpg",
            body: fs.createReadStream("./image.jpg"),
        };

        // Step 5: Update file on Google Drive
        const res = await drive.files.update({
            fileId: fileId,
            resource: fileMetadata,
            media: media,
            fields: "id",
        });

        return res.data.id;
    } catch (error) {
        console.log(error);
    }
}

// Get file from Google Drive
async function getFileFromGoogleDrive(fileId) {
    try {
        // Step 1: Authenticate with Google Drive API using OAuth2
        const auth = new google.auth.GoogleAuth({
            keyFile: "./googleKey.json",
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        // Step 2: Create a Google Drive service object
        const drive = google.drive({ version: "v3", auth });

        // Step 3: Get file from Google Drive
        const res = await drive.files.get({
            fileId: fileId,
            fields: "*",
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// uploadFileToGoogleDrive()
//   .then((id) => console.log(id))
//   .catch((err) => console.log(err));
getFileFromGoogleDrive("15FEQsbyQLW5zi5t3vhSHh005saPL-MfD").then((res) =>
    console.log(res)
    ).catch((err) => console.log(err));