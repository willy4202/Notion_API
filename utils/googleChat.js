const fetch = require('node-fetch');

const notion_webhook =
  'https://chat.googleapis.com/v1/spaces/AAAATrMPwY8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Gku50H4kLKlh0jRjTWncSfV9Mip1Pa57r12LQDmCNWY%3D';

async function sendMessageToSpace(message) {
  const data = JSON.stringify({
    text: message,
  });
  try {
    let response = await fetch(notion_webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: data,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendMessageToSpace };
