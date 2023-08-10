import http from "http";
import app from "./app";
import connection from "./db/connection";

const PORT = 4000;

const server = http.createServer(app);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
