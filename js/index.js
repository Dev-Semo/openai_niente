import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";

function send() {
  if (document.querySelector("#input").value !== "") {
    var template = `<div class="line">
          <span class="chat-box mine">${
            document.querySelector("#input").value
          }</span>
        </div>`;
    document
      .querySelector(".chat-content")
      .insertAdjacentHTML("beforeend", template);
    document.querySelector("#input").value = "";
    document
      .querySelector(".chat-content")
      .scrollTo(0, document.querySelector(".chat-content").scrollHeight);

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: document.querySelector("#input").value,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((result) => {
        console.log(result.data.choices[0].text);
        var template = `<div class="line">
            <span class="chat-box">${result.data.choices[0].text}</span>
          </div>`;
        document
          .querySelector(".chat-content")
          .insertAdjacentHTML("beforeend", template);
        document
          .querySelector(".chat-content")
          .scrollTo(0, document.querySelector(".chat-content").scrollHeight);
      });
  }
}

document.querySelector("#input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    send();
  }
});
document.querySelector("#send").addEventListener("click", send);
