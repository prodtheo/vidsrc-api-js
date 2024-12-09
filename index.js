import express from "express";
import cors from "cors";
import { getvidsrc } from "./src/vidsrcpro.js";
import { getasiaheroku } from "./src/asiaheroku.js";

const port = 3000;

const app = express();

// Configure CORS to allow multiple origins
const allowedOrigins = [
    "http://localhost:3000",
    "https://tv.starnode.host",
    "https://bunmbiesasvgsaf.netlify.app"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the ReelBox Api",
        routes: {
            movie: "/vidsrc/:movieTMDBid",
            show: "/vidsrc/:showTMDBid?s=seasonNumber&e=episodeNumber"
        },
        author: "This API is developed and created by Aurion Development"
    });
});

app.get('/vidsrc/:tmdbId', async (req, res) => {
    const id = req.params.tmdbId;
    const season = req.query.s;
    const episode = req.query.e;

    try {
        if (season && episode) {
            const vidsrcresponse = await getvidsrc(id, season, episode);
            res.status(200).json(vidsrcresponse);
        } else {
            const vidsrcresponse = await getvidsrc(id);
            res.status(200).json(vidsrcresponse);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/asiaheroku/:tmdbId', async (req, res) => {
    const id = req.params.tmdbId;
    const season = req.query.s;
    const episode = req.query.e;

    try {
        if (season && episode) {
            const srcresponse = await getasiaheroku(id, season, episode);
            res.status(200).json(srcresponse);
        } else {
            const vidsrcresponse = await getasiaheroku(id);
            res.status(200).json(vidsrcresponse);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
