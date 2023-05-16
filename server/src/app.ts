require("dotenv").config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const userProfileRoute = require("./routes/root");
const documentRoute = require("./routes/documentRoute");

const SpfxConnection = () => {
  sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/Adith",

          "582521e5-ac9a-402c-82cb-5c7c9f64ba4c",

          "G6f+WBp2EWe3jM1RvfNhbHHwGmpMtRzGaV+IxZ4VEno="
        ),
    },
  });
};

SpfxConnection();

const app: Application = express();
app.use(cors());
const port: number = 3001;

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(options));
app.use(express.json());
app.use("/users", userProfileRoute);
app.use("/doc", documentRoute);

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
