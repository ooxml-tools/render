import fs from "fs";
import path from "path";
import readline from "readline";
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

const drive = google.drive("v3");

async function convertToPdf(fileName: string) {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: "https://www.googleapis.com/auth/drive.file",
  });
  google.options({ auth });

  const opts = {
    // Use the `onUploadProgress` event from Axios to track the
    // number of bytes uploaded to this point.
    onUploadProgress: (evt: { bytesRead: number }) => {
      const progress = (evt.bytesRead / fileSize) * 100;
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${Math.round(progress)}% complete`);
    },
  };

  const fileSize = fs.statSync(fileName).size;
  const res = await drive.files.create(
    {
      requestBody: {
        // a requestBody element is required if you want to use multipart
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    opts,
  );
  console.log(res.data);

  const res2 = await drive.files.export(
    {
      fileId: res.data.driveId!,
      mimeType: "application/pdf",
    },
    opts,
  );
  console.log(res2.data);

  return res2.data;
}

export async function render(inputPath: string, outputPath: string) {
  const res = await convertToPdf(inputPath);
  console.log("res=", res);
}

export async function isSupported() {
  // TODO: Check if auth keys are present
  return false;
}
