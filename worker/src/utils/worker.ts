import dotenv from "dotenv";
import fs from "fs";
import AWS from "aws-sdk";
import path = require("path");
const mime = require("mime-types");

dotenv.config();

const s3 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: "auto",
});

const uploadFolder = async (folderPath: string, prefix: string = "") => {
  const items = fs.readdirSync(folderPath);
  console.log("Reading folder:", folderPath);
  console.log("check for items: ", items);
  for (const item of items) {
    const fullPath = path.join(folderPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      await uploadFolder(fullPath, `${prefix}${item}/`);
    } else {
      const fileName = `${prefix}${item}`;
      console.log("Uploading pt2:", fileName);
      await uploadToR2(fullPath, fileName);
    }
  }
};

export async function uploadToR2(filePath: string, fileName: string) {
  const fileStats = fs.statSync(filePath);
  const contentType = mime.lookup(filePath);

  if (fileStats.size < 52428800) {
    const file = fs.readFileSync(filePath);
    const params = {
      Bucket: "ship-it",
      Key: fileName,
      Body: file,
      ContentType: contentType,
    };
    await s3.putObject(params).promise();
  } else {
    const params = {
      Bucket: "ship-it",
      Key: fileName,
      Body: fs.createReadStream(filePath),
      ContentType: contentType,
    };
    await s3.upload(params).promise();
  }
}

export async function execute(folderPath: string) {
  try {
    console.log("able to call Execute");

    const folderName = path.basename(folderPath);
    await uploadFolder(folderPath, `${folderName}/`);
    return { returnQ: 1, folderName };
  } catch (e) {
    console.log(e);
  }
}

export async function screenshotWorker(path: string, buffer: Buffer) {
  await s3
    .putObject({
      Bucket: "ship-it",
      Key: `${path}/screenshot-${path}.png`,
      Body: buffer,
      ContentType: "image/png",
    })
    .promise();
}
