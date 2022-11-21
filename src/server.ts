import express, { Request, Response } from "express";
import { promises as fs } from 'fs';
import bodyParser from "body-parser";
import { Patient } from "./types/PatientTypes";

const app = express();
const port = 9000;
let cachedData: Patient[];

app.set('json spaces', 2);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.get("/", async (_: Request, res: Response) => {
  res.redirect("/appointments");
});

app.get("/appointments", async (_: Request, res: Response) => {
  if (!cachedData) {
    const data = await fs.readFile('data.json');
    cachedData = JSON.parse(data.toString());
  }
  res.json(cachedData);
});

app.post("/addNewEntry", async (req: Request, res: Response) => {
  cachedData.push(req.body);
  res.json(cachedData);
})

app.delete("/deleteEntry/:id", async (req: Request, res: Response) => {
  cachedData = cachedData.filter(item => item.id !== req.params.id);
  res.json(cachedData);
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});