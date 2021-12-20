const exec = require("child_process").execSync;
let output = undefined
try {
  output = exec("npm run test -- --showConfig", {
    cwd: "./client",
  }).toString();
} catch(_) {
  output = exec("npm run test -- --showConfig").toString();
}
const jsonStart = output.indexOf("{");
const config = JSON.parse(output.substr(jsonStart));

const final = {
  roots: ["<rootDir>"],
  // ...config.globalConfig,
  ...config.configs[0],
  moduleNameMapper: config.configs[0].moduleNameMapper.reduce((acc, cur) => ({...acc, [cur[0]]: cur[1]}), {}),
  transform: config.configs[0].transform.reduce((acc, cur) => ({...acc, [cur[0]]: cur[1]}), {}),
  displayName: "client",
};

delete final.cwd;

module.exports = final;