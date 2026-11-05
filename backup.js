const { execSync } = require("child_process");

try {
  execSync("git config --global user.email 'backup@render.com'");
  execSync("git config --global user.name 'Render Backup'");

  execSync("git add itens_db.json");

  try {
    execSync(`git commit -m "Backup ${new Date().toISOString()}"`);
  } catch {
    console.log("Nenhuma alteração");
    process.exit(0);
  }

  execSync(
    `git push https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}.git HEAD:main`,
    { stdio: "inherit" }
  );

  console.log("Backup enviado");
} catch (err) {
  console.error(err.message);
}