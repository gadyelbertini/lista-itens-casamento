const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('itens_db.json');
const middlewares = jsonServer.defaults();

const port = process.env.port || 8080;

server.use(middlewares);

const { exec } = require("child_process");

server.use((req, res, next) => {
  res.on("finish", () => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      exec("node backup.js", (err) => {
        if (err) {
          console.error("Erro no backup:", err);
        }
      });
    }
  });

  next();
});

server.use(router);

server.use(router);
server.listen(port, ()=>{
	console.log(`JSON Server is running in ${port}`);
});