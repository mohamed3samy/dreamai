import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/dream', async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const aiResponse = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
		});

		const image = aiResponse.data.data[0].url;

		res.send({ image });
	} catch (error) {
		console.log(error);
		res.status(500).send(
			error?.response.data.error.message || 'Somthing went wrong'
		);
	}
});

app.listen(5000, () =>
	console.log('make art on http://localhost:5000/dream')
);
