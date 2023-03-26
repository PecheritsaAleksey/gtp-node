require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const readline = require("readline");

const openaiapi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

const history = [];

userInterface.on("line", async (line) => {
  history.push({ role: "user", content: line });
  const response = await openaiapi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history,
  });

  console.log(response.data.choices[0].message.content);
  userInterface.prompt();
});
