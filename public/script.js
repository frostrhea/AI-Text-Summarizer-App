const textArea = document.getElementById("text_to_summarize");

const submitButton = document.getElementById("submit-button");

const summarizedTextArea = document.getElementById("summary");

min_length = document.getElementById("min-length").value;
max_length = document.getElementById("max-length").value;


submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);


function verifyTextLength(e) {
  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");
  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", "Bearer " + process.env['ACCESS_TOKEN']);

  //const minLength = min_length.value;
  //const maxLength = max_length.value;

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize,
    "parameters": {
      "max_length": max_length,
      "min_length": min_length
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('/summarize', requestOptions)
    .then(response => response.text())
    .then(summary => {
      summarizedTextArea.value = summary; // update output text area
      submitButton.classList.remove("submit-button--loading"); //stop loading animation
    })
    .catch(error => {
      console.log('error', error);
    });
}
