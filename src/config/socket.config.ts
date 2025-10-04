import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import logger from "./logger.config";
import roomHandler from "../handlers/Room.handler";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info("New user connected");
    roomHandler(socket); // pass the socket connection to the room handler for room creation and joining

    socket.on("disconnect", () => {
      logger.info("User disconnected");
    });
  });
};
