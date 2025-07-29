require('dotenv').config();
import { BlobServiceClient } from '@azure/storage-blob';

const path = require('path');
const fs = require('fs');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function uploadFile(containerName, localFilePath) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = path.basename(localFilePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadFile(localFilePath);
  console.log(`✅ File uploaded to: ${blockBlobClient.url}`);
}

