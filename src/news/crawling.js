const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const sanitize = require('sanitize-html');

const getHtml = async (keyword) => {
  try {
    return await axios.request({
      method: 'GET',
      url: 'https://www.mk.co.kr/search?word=' + encodeURI(keyword),
      encoding: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const parsing = async (keyword) => {
  const html = await getHtml(keyword);
  const $ = cheerio.load(html.data);
  const $articleList = $('li.news_node');

  let article = [];
  $articleList.each((idx, node) => {
    const title = $(node).find('.news_ttl').text();
    console.log(title);
  });
};

module.exports = { getHtml, parsing };
