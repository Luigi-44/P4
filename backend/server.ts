import express from "express";
// import cors from "cors" //on import npm i cors dans notre back pour "échanger" avec notre front et lui dire, ok tu peux échanger avec l'URL http://localhost:XXXX
const app = express(); // Stock toute la puissance d'express dans app

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`💜 Frontend lancé http://localhost:${port}`);
});
