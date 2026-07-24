const { v4: uuidv4 } = require("uuid");
const containerClient = require("../config/azureStorage");

const uploadToAzure = async (file) => {
  const blobName = `${uuidv4()}-${file.originalname}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype,
    },
  });

  return blockBlobClient.url;
};

module.exports = uploadToAzure;