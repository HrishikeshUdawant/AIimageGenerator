// import express from "express";
// import Replicate from "replicate";
// import fetch from "node-fetch";
// import "dotenv/config";

// const router = express.Router();

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// router.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const output = await replicate.run(
//       "stability-ai/stable-diffusion:db21e45e61ab9c59ff8ad4185a96e7fef8fdfa0666b569c4b20ceee32a7e9570",
//       { input: { prompt } }
//     );

//     const imageUrl = output[0];
//     const imageResponse = await fetch(imageUrl);
//     const buffer = Buffer.from(await imageResponse.arrayBuffer());

//     return res.status(200).json({
//       photo: buffer.toString("base64"),
//     });

//   } catch (error) {
//     console.error("REPLICATE ERROR:", error);
//     return res.status(500).json({ error: "Image generation failed" });
//   }
// });

// export default router;


import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Direct image generation URL
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    // Fetch image as buffer
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert image → Base64
    const base64Image = buffer.toString("base64");

    return res.status(200).json({
      photo: base64Image,
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ error: "Image generation failed" });
  }
});

export default router;
