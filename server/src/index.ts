import express from "express";
import http from "http";
import startApollo from "./apollo";
import source from "./source";


const app = express();
const server = http.createServer(app);

app.use(express.static("../client/build"));
app.use("/", express.static("../client/build"));

startApollo(app, server).then((start) => start(4000));
