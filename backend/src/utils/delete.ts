import dotenv from "dotenv";

import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
dotenv.config();

const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: "auto",
});

export async function deleteProject(bucket: string, prefix: string) {
  let continuationToken;

  do {
    const listResponse: any = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    );

    const objects = listResponse.Contents?.map((obj: any) => ({
      Key: obj.Key,
    }));

    if (objects && objects.length > 0) {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: objects,
          },
        })
      );
    }
    continuationToken = listResponse.NextContinuationToken;
  } while (continuationToken);
  return { success: true };
}
