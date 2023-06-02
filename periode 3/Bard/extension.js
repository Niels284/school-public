const vscode = require("vscode");
const { isAxiosError } = require("axios");
const { Configuration, OpenAIApi } = require("openai");

let disposable;

function activate(context) {
  console.log('Congratulations, your extension "Bard" is now active!');

  disposable = vscode.commands.registerCommand(
    "Bard.helloWorld",
    async function () {
      const configuration = new Configuration({
        apiKey: "(-<API_KEY>)", // weggehaald ivm veiligheidsredenen
      });

      // OpenAI API functie
      const chatWithOpenAI = async (question) => {
        try {
          const openai = new OpenAIApi(configuration);
          const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              {
                role: "user",
                content: question,
              },
            ],
          });
          return completion.data.choices[0].message.content.trim();
        } catch (e) {
          if (isAxiosError(e)) {
            return console.log(e.response.data);
          }
          console.log(e);
        }
      };

      // Aan de gebruiker laten weten dat de extensie werkt
      vscode.window.showInformationMessage(
        "Hello! You successfully ran my extension"
      );

      // Vragen om een vraag te stellen
      const question = await vscode.window.showInputBox({
        prompt: "What's your question?",
      });

      if (question) {
        vscode.window.showInformationMessage(`Your question is "${question}"`);
        try {
          const response = await chatWithOpenAI(question);
          if (response === "") {
            vscode.window.showErrorMessage("Error: Empty response");
          } else {
            vscode.window.showInformationMessage(response);
          }
        } catch (error) {
          console.error("Error occurred:", error);
          vscode.window.showErrorMessage("Error occurred. Please try again.");
        }
      } else {
        vscode.window.showInformationMessage("No question provided");
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {
  if (disposable) {
    disposable.dispose();
  }
}

module.exports = {
  activate,
  deactivate,
};
