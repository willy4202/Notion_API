const { default: axios } = require('axios');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const notion_webhook = process.env.SPACE_ID;

async function sendMessageToSpace(message) {
  try {
    const response = await axios.post(notion_webhook, { text: message });
    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendMessageToSpace };
