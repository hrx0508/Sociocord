import { server } from "./src/app/app.js";
import { connectDb } from "./src/config/db.config.js";


connectDb()

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})