import fs from "fs";
import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";

const app = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, `${__dirname}/../../fileUpload`);
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/:id", upload.single("filename"), async (req: any, res: Response) => {
  console.log("first");
  const { id } = req.params;
  try {
    const fileData = fs.readFileSync(req.file.path);
    console.log(fileData);
    await sp.web
      .getFolderByServerRelativePath(`userVault/${id}`)
      .files.addUsingPath(req.file.originalname, fileData, {
        Overwrite: true,
      });
    res.send(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const files = await sp.web
      .getFolderByServerRelativePath(`userVault/${id}`)
      .files();
    res.send(files);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/image/upload/:id", upload.single("image"), async (req: any, res) => {
  try {
    const { id } = req.params;
    const imageData = fs.readFileSync(req.file.path);
    const list = sp.web.lists.getByTitle("userProfile");
    const imageRes = await sp.web
      .getFolderByServerRelativePath(`userVault/${id}`)
      .files.addUsingPath(req.file.originalname, imageData, {
        Overwrite: true,
      });
    await list.items.getById(+id).update({
      imgUrl: imageRes.data.ServerRelativeUrl,
    });
    res.send("image send");
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
