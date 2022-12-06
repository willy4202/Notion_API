const { Client } = require('@notionhq/client');
const { createPage, createBulkPageToDB } = require('./src/page/pageMethods');
const { postQueryDB, exportDBtoJSON } = require('./src/databases/dbMethods');

const dotenv = require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

// =========== page ===========
createPage('hi', notion, databaseId);
// createBulkPageToDB(notion, databaseId);

// =========== database ===========
//postQueryDB(notion, databaseId);
//exportDBtoJSON(notion, databaseId);
