import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";

const app = express.Router();

//GET ALL USERS
app.get("/", async (req: Request, res: Response) => {
  try {
    const items: any[] = await sp.web.lists.getByTitle("userProfile").items();
    res.send(items);
  } catch (err) {
    res.send(err);
  }
});

//GET SINGLE USER
app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let data = await sp.web.lists
      .getByTitle("userProfile")
      .items.getById(+id)();
    res.send(data);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//ADD USER
app.post("/adduser", async (req: Request, res: Response) => {
  const {
    name,
    date,
    gender,
    email,
    description,
    joindate,
    city,
    phonenum,
    position,
    role,
    experience,
    imgUrl,
  } = req.body;
  try {
    const postData = await sp.web.lists.getByTitle("userProfile").items.add({
      Title: "Person",
      name,
      date,
      gender,
      email,
      description,
      joindate,
      city,
      phonenum,
      position,
      role,
      experience,
      imgUrl,
    });

    let response = await sp.web
      .getFolderByServerRelativePath("userVault")
      .addSubFolderUsingPath(`${postData.data.Id}`);
    res.send({ postData, response });
    console.log(postData);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error adding user. Please try again.");
  }
});

//UPDATE USER
app.patch("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body.user;

  try {
    console.log("Updating user with ID:", id);
    console.log("New user data:", req.body);
    const list = sp.web.lists.getByTitle("userProfile");
    await list.items.getById(+id).update(userData);
    //  if (image !== "") {
    //   let document = await sp.web
    //     .getFolderByServerRelativePath(`documentsLibrary/${id}`)
    //     .files.addUsingPath(fileNamePath, image, { Overwrite: true });
    //   await list.items.getById(+id).update({
    //     imageUrl: document.data.ServerRelativeUrl,
    //   });
    // }
    res.send("User Updated Succesfully");
  } catch (err) {
    res.send(err);
  }
});

//DELETE USERS
app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = sp.web.lists.getByTitle("userProfile");
    await list.items.getById(+id).delete();
    res.send("User deleted successfully");
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
