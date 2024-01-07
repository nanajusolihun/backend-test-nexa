import express from "express";
import cors from "cors";
import router_user from "./src/routers/r_user.js";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api/v1", router_user);

//  Acces url image
app.use("/api/v1/image/", express.static("./public"));

app.listen(port, () => {
  console.log(`Server is Running at http://localhost${port}`);
});
