const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const { logInfo } = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logInfo(`Server running on port ${config.PORT}`);
});
