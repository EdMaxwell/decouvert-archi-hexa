import express from 'express';
import conferenceRoute from "./routes/conference.route";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(conferenceRoute)

export default app;