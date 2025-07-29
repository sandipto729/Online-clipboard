import { BlobServiceClient } from '@azure/storage-blob';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function uploadToAzureBlob(localFilePath, blobName) {
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error('Azure Storage connection string is not set in environment variables');
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
  await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(localFilePath);

  // Delete local file
  fs.unlink(localFilePath, (err) => {
    if (err) {
      console.error('❌ Failed to delete local file:', err);
    } else {
      console.log(`🗑️ Deleted local file: ${localFilePath}`);
    }
  });

  
  console.log(`✅ File uploaded to Azure Blob Storage: ${blockBlobClient.url}`);
  return blockBlobClient.url;
}

export default uploadToAzureBlob;
