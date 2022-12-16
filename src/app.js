import "dotenv/config";

import express from "express";
import cors from "cors";

import peopleRouter from "./routes/people.route";
import elasticRouter from "./routes/elasticStats.route";


const app = express();

// setting
app.set("port", ( parseInt(process.env.PORT) || 3000 ) );

// Middlewares

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

app.get("/", (req, res) => res.json({ message: "Backend API REST" }));

app.use("/api/v1/people", peopleRouter)
app.use("/api/v1/elastic", elasticRouter)


export default app;