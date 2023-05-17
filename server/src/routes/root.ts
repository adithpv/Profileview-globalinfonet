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
  const { user: userData } = req.body;

  try {
    console.log("Updating user with ID:", id);
    console.log("New user data:", req.body);

    const userProfileList = sp.web.lists.getByTitle("userProfile");
    await userProfileList.items.getById(+id).update(userData);

    res.send("User Updated Successfully");
  } catch (err) {
    res.send(err);
  }
});

//DELETE USER
app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userProfileList = sp.web.lists.getByTitle("userProfile");
    const userVaultList = sp.web.lists.getByTitle("userVault");

    const deleteItemPromise = userProfileList.items.getById(+id).delete();
    const deleteFolderPromise = userVaultList.rootFolder.folders
      .getByName(id)
      .delete();

    await Promise.all([deleteItemPromise, deleteFolderPromise]);

    res.send("User deleted successfully");
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
