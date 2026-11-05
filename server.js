const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('itens_db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

server.use(middlewares);

const { exec } = require("child_process");

server.use((req, res, next) => {
  res.on("finish", () => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {

      console.log("Executando backup...");

      exec("node backup.js", (err, stdout, stderr) => {
        if (err) {
          console.error("Erro no backup:", err);
          return;
        }

        console.log(stdout);
      });
    }
  });

  next();
});

server.use(router);
server.listen(port, ()=>{
	console.log(`JSON Server is running in ${port}`);
});