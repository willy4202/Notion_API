const { Client } = require('@notionhq/client');
const { response } = require('express');
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;
console.log('🚀 ~ file: index.js:11 ~ databaseId', databaseId);

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
  } catch (error) {
    console.error(error.body);
  }
}

// addItem('Yurts in Big Sur, California');

async function getItem() {
  try {
    const response = await notion.pages.retrieve({
      parent: { database_id: databaseId },
    });
    console.log(response);
  } catch (err) {
    console.log(err.body);
  }
}

getItem();
