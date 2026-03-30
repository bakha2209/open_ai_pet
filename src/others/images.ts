import OpenAI, { toFile } from "openai";
import { writeFileSync, readFileSync } from "fs";

const openai = new OpenAI();
async function generateFreeImage() {
  const response = await openai.images.generate({
    prompt: "A photo of a cat on a mat",
    model: "dall-e-2",
    size: "256x256",
    n: 1,
  });
  console.log(response);
}

async function generateFreeLocalImage() {
  const response = await openai.images.generate({
    prompt: "A photo of a cat on a mat",
    model: "dall-e-2",
    size: "256x256",
    n: 1,
    response_format: "b64_json",
  });
  const rawImage = response.data[0].b64_json;
  if (rawImage) {
    writeFileSync("catmat.png", Buffer.from(rawImage, "base64"));
  }
}

async function generateAdvancedImage() {
  const response = await openai.images.generate({
    prompt: "Photo of a city at night with skyscrapers",
    model: "dall-e-3",
    quality: "hd",
    size: "1024x1024",
    response_format: "b64_json",
  });
  const rawImage = response.data[0].b64_json;
  if (rawImage) {
    writeFileSync("city_night.png", Buffer.from(rawImage, "base64"));
  }
}

async function generateImageVariation() {
  const response = await openai.images.createVariation({
    image: await toFile(readFileSync("city_night.png"), "city_night.png", {
      type: "image/png",
    }),
    model: "dall-e-2",
    response_format: "b64_json",
    n: 1,
  });
  const rawImage = response.data[0].b64_json;
  if (rawImage) {
    writeFileSync("cityVariation.png", Buffer.from(rawImage, "base64"));
  }
}

async function editImage() {
  const response = await openai.images.edit({
    image: await toFile(readFileSync("city_night.png"), "city_night.png", {
      type: "image/png",
    }),
    mask: await toFile(
      readFileSync("city_night_mask.png"),
      "city_night_mask.png",
      { type: "image/png" },
    ),
    prompt: "Add thunderstorm to the sky",
    model: "dall-e-2",
    response_format: "b64_json",
  });
  const rawImage = response.data[0].b64_json;
  if (rawImage) {
    writeFileSync("cityEdited.png", Buffer.from(rawImage, "base64"));
  }
}
// generateFreeImage();
editImage();
