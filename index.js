const { Client } = require('@notionhq/client');
const { response } = require('express');
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function getPage() {
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
}

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

addItem('hi');

const createDatabase = async () => {
  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

async function getDatabases() {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    console.log(response);
  } catch (err) {
    console.log(err.body);
  }
}
