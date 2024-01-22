const axios = require('axios');
// This is the function where the call to the API is made. Returns the summarized text as a string.


async function summarizeText(text, min_length, max_length) {
  console.log(min_length);
  let data = {
    "inputs": text,
    "parameters": {
      "max_length": max_length,
      "min_length": min_length
    }
  };

  //  FIX PASSING SUMMARY LENGTH VALUES -------------------------------------

  // A config object that will contain the instructions for the API call
  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };


  try {
    const response = await axios.request(config);
    return response.data[0].summary_text;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = summarizeText;