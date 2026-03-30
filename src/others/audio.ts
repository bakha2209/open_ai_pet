import OpenAI, { toFile } from "openai";
import { writeFileSync, createReadStream } from "fs";
import { create } from "domain";

const openai = new OpenAI();

async function createTranscription() {
    const response = await openai.audio.transcriptions.create({
        file: createReadStream('sample-3.m4a'),
        model:'whisper-1',
        language:'en',
    })
    console.log(response)
}

async function translate() {
    const response = await openai.audio.translations.create({
        file: createReadStream('korean_audio.m4a'),
        model:'whisper-1',
    })
    console.log(response)
}

async function textToSpeech() {
    const sampleText = "Hello, this is a text-to-speech conversion example using OpenAI's API.";
    const response = await openai.audio.speech.create({
        model: "tts-1",
        input: sampleText,
        voice: "alloy",
        response_format: "mp3",
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync("output.mp3", buffer);
}
//createTranscription();
//translate();
textToSpeech();