import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Request, Response } from "express";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/notes", async function (req: Request, res: Response) {
  const { message } = req.body;
  const note = await prisma.note.create({
    data: {
      message: String(message),
    },
  });
  res.json({ message: "success", data: note });
});

app.get("/notes", async function (req: Request, res: Response) {
  const notes = await prisma.note.findMany();
  res.json({ message: "success", notes: notes });
});

app.delete("/notes/:id", async function (req: Request, res: Response) {
  const id = Number(req.params.id);
  const note = await prisma.note.delete({
    where: {
      id: id,
    },
  });
  res.json({ message: "success", deletedNote: note });
});

app.listen(4000, () => {
  console.log("Express server is running on port 4000");
});
