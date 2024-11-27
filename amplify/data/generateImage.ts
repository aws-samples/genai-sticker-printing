import type { Schema } from "./resource";
import { Jimp } from 'jimp';
import stringify from 'json-stable-stringify';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelCommandInput,
} from "@aws-sdk/client-bedrock-runtime";

// initialize bedrock runtime client
const client = new BedrockRuntimeClient({ region: "us-west-2" });

export const handler: Schema["generateImage"]["functionHandler"] = async (
  event,
  context
) => {
  // User prompt
  const prompt = event.arguments.prompt;

  // Invoke Stable Diffusion model
  const input = {
    modelId: "stability.stable-image-core-v1:0", // Stable Diffusion Image Core model
    contentType: "application/json",
    accept: "application/json",
    body: stringify({
      prompt: prompt,
      seed: Math.floor(Math.random() * 1000) // Random seed
    }),
  } as InvokeModelCommandInput;

  const command = new InvokeModelCommand(input);

  try {
    const response = await client.send(command);

    // Parse the response and extract the base64 encoded image
    const data = JSON.parse(Buffer.from(response.body).toString());

    if (data.images && data.images.length > 0) {
      // extract the base64 encoded image from data.images[0]
      // add a 40% black border around the outside
      const borderedImage = await addBorderToImage(data.images[0]);

      return borderedImage;
    } else {
      throw new Error("No image generated in the response");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

async function addBorderToImage(base64Image: string): Promise<string> {
  try {
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Read the image using Jimp
    const image = await Jimp.fromBuffer(imageBuffer);

    // Calculate border size (40% of the image height)
    const borderSize = Math.round(image.bitmap.height * 0.4);

    // Create a new image with the border
    const borderedImage = new Jimp({
      width: image.bitmap.width + borderSize * 2,
      height: image.bitmap.height + borderSize * 2,
      color: 'black' // Black color for border
    });

    // Composite the original image onto the new image with border
    borderedImage.composite(image, borderSize, borderSize);
    const borderedBase64Image = await borderedImage.getBase64("image/png");

    // Convert buffer to base64
    return borderedBase64Image;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

