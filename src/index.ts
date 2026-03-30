import { OpenAI } from "openai";
import { encoding_for_model } from "tiktoken";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "say something cool",
      },
    ],
    frequency_penalty: 1.5,
    seed:5555
  });
  console.log(response.choices[0].message.content);
  console.log(response.choices[1].message.content);
}
function encodePrompt() {
  const prompt = "How are you today?";
  const encoder = encoding_for_model("gpt-4o");
  const words = encoder.encode(prompt);
  console.log(words);
}

main();
//encodePrompt();
