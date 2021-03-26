// API GET WORD
// API GET WORD
// API GET WORD
const apiUrl = "https://random-words-api.vercel.app/word";
const secretWordDiv = document.querySelector(".secret-word");
let isRunning = true;

async function getWordFromApi() {
  const params = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  let word;
  await fetch(apiUrl, params)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      word = data;
    })
    .catch(function (err) {
      console.log("Unable to fetch the data", err);
    });

  return word[0].word;
}
getWordFromApi().then(async function (word) {
  let secretWord = "";
  for (let i = 0; i < word.length; i++) {
    secretWord += "_";
  }
  for (let i = 0; i < secretWord.length; i++)
    secretWordDiv.innerHTML += secretWord[i] + " ";

  console.log(word);

  let contor = 1;
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (e) => {
    if (isRunning == true) {
      let letter;
      if (e.target.classList.contains("button-letter")) {
        letter = e.target.innerHTML.toLowerCase();
        let vector = checkLetter(word.toLowerCase(), letter);
        if (vector.length != 0) {
          let aux = 0;
          for (let i = 0; i < word.length; i++) {
            if (i == vector[aux]) {
              secretWord =
                secretWord.substring(0, i) +
                letter +
                secretWord.substring(i + 1);
              aux++;
              console.log(secretWord);
            }
          }
          secretWordDiv.innerHTML = "";
          for (let i = 0; i < secretWord.length; i++)
            secretWordDiv.innerHTML += secretWord[i] + " ";
        } else {
          contor++;
          const image = document.querySelector(".hangman-image");
          if (contor < 8) {
            image.src = `art/${contor}.png`;
          } else {
            image.src = `art/${contor}.png`;
            isRunning = false;
            stopGame(word);
          }
        }

        e.target.style.display = "none";
      }
    }
  });
});

function checkLetter(word, letter) {
  let vector = [];
  for (let i = 0; i < word.length; i++) if (word[i] == letter) vector.push(i);
  return vector;
}

function stopGame(word) {
  console.log("Game stopped");
  secretWordDiv.innerText = `You lost, the word was ${word}`;
}
