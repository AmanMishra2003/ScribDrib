const express = require('express');
const authorization = require('../middleware/authorization');
const { GoogleGenAI } = require('@google/genai')
const router = express.Router();

//import model
const Room = require('../models/roomModel')

const ai = new GoogleGenAI(
    {
        apiKey: process.env.GEMINIAPIKEY
    }
)

//gemini summary router
router.post('/:id', authorization, async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const room = await Room.findOne({ roomId: id });
        if (!room) {
            return res.status(404).json({ success: false, msg: "Room not found" });
        }

        if (!room.boardData) {
            return res.status(400).json({ success: false, msg: "No board data available" });
        }

        const prompt = `You are an AI that interprets digital whiteboards.

Return your output INSIDE a <pre>...</pre> block so that formatting, indentation, bullet points, and line breaks are preserved exactly for the user to copy.

Your task:
Analyze the following Fabric.js JSON data and produce a clean, human-friendly summary in TWO clearly separated sections:

1. **What is on the Screen**
   - Describe the visible shapes, drawings, text, symbols, or layout.
   - Mention structure, positioning, and grouping.
   - Do NOT mention JSON, Fabric.js, object types, or code terms.

2. **Possible Meaning Behind the Drawing**
   - Infer what the user was trying to express.
   - Interpret the idea, concept, or message of the drawing.
   - Provide 2–3 possible interpretations (practical, conceptual, creative).

Formatting Requirements:
- Use bullet points where appropriate.
- Keep the summary clear and readable.
- Preserve all spacing and indentation.
- The entire response must be inside a <pre> block.

Whiteboard Data:
${room.boardData}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const output = response.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated"; // get generated text

        return res.json({ success: true, output });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.msg });
    }
})




module.exports = router