const { Client } = require('@notionhq/client');
const { response } = require('express');
const dotenv = require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');

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

// addItem('hi');

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
    console.log(response.properties);
  } catch (err) {
    console.log(err.body);
  }
}

getDatabases();

async function addPagetoDatabase(title, address, url, category) {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },

    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      address: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: address,
            },
          },
        ],
      },
      link: {
        url: url,
      },
      category: {
        select: {
          name: category,
        },
      },
    },
  });
  console.log(response);
}
// addPagetoDatabase('스타벅스', '용산', 'www.starbucks.com', '브랜드카페');

function getData() {
  axios.get('./public/MOCK.json', (res) => {
    response.json([]);
  });
}
// getData();
