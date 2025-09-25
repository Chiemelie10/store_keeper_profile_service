import { AppDataSource } from "./config/data-source";
import express from "express";
import profileRoutes from "./routes/profileRoutes";
import path from "path";

AppDataSource.initialize().then(async () => {

    const app = express();
    const port = 3000;

    app.use(express.json());
    app.set("trust proxy", true);
    app.use("/public", express.static(path.join(__dirname, "public")));
    app.use("/api/profiles", profileRoutes);

    app.listen(port, () => {
        console.log(`MyStock profile service listening on port ${port}`);
    });

}).catch(error => console.log(error))
