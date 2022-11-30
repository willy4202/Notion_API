import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.notion.com/v1/databases',
  headers: {
    accept: 'application/json',
    'Notion-Version': '2022-06-28',
    'content-type': 'application/json',
  },
};

export default options;
