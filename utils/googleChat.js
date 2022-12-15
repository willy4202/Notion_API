const { google } = require('googleapis');
const chat = google.chat('v1');
const fetch = require('node-fetch');

const auth = new google.auth.GoogleAuth({
  keyFile: '../notion-api-test-371502-111a674b761a.json',
  scopes: ['https://www.googleapis.com/auth/chat.bot'],
});

/**
 * Sends asynchronous message into Google Chat
 */
async function sendMessageToSpace(message) {
  const webhookURL =
    'https://chat.googleapis.com/v1/spaces/AAAATrMPwY8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Gku50H4kLKlh0jRjTWncSfV9Mip1Pa57r12LQDmCNWY%3D';

  const data = JSON.stringify({
    text: message,
  });
  let resp;
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
  }).then((response) => {
    resp = response;
    console.log(response);
  });
  return resp;
}

module.exports = { sendMessageToSpace };
