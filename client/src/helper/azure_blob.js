
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';

// const AZURE_STORAGE_CONNECTION_STRING = import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=your_account;AccountKey=your_key;EndpointSuffix=core.windows.net"
if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set!');
}

async function uploadFile(containerName='checkfile', localFilePath) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  const blobName = path.basename(localFilePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadFile(localFilePath);
  console.log(`✅ File uploaded to: ${blockBlobClient.url}`);
}

export default uploadFile;
