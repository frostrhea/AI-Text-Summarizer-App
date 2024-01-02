const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

app.post('/summarize', (req, res) => {
  const text = req.body.text;  //get text from request body

  summarizeText(text);  //call function passing in text
    .then(response => {
      res.send(response);  // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.messaged);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
