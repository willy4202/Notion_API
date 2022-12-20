// const { default: axios } = require('axios');

async function getDataFromBackend() {
  try {
    const res = await fetch('http://localhost:8000');

    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

// Note that top-level await is only available in modern browsers
// https://caniuse.com/mdn-javascript_operators_await_top_level

getDataFromBackend();
