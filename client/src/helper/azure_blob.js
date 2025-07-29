// const { BlobServiceClient } = require('@azure/storage-blob');
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';

const AZURE_STORAGE_CONNECTION_STRING = import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING;

async function uploadFile(containerName='checkfile', localFilePath) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = path.basename(localFilePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadFile(localFilePath);
//   console.log(✅ File uploaded to: ${blockBlobClient.url});
    console.log(`✅ File uploaded to: ${blockBlobClient.url}`);
    return blockBlobClient.url; 
}

export default uploadFile; 