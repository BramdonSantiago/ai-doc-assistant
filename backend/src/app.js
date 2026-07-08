const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());


// rutas
app.use("/api/ai", aiRoutes);


// IMPORTANTE:
// debe ir al final
app.use(errorMiddleware);


module.exports = app;


