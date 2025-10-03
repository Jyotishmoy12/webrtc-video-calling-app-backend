import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import logger from "./logger.config";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info("New user connected");

    socket.on("disconnect", () => {
      logger.info("User disconnected");
    });
  });
};
