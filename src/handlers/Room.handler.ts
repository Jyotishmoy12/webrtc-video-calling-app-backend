import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import logger from "../config/logger.config";

const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = UUIDv4(); // this will be our unique room id in which multiple users can join
    socket.join(roomId); // joining the room
    socket.emit("room-created", { roomId }); // emitting the room id to the user that socket is connected
    logger.info(`Room created with id ${roomId}`);
  };
  const joinedRoom = ({roomId}: {roomId: string}) => {
    logger.info(`New user joined with id ${roomId}`);
  };
  // when to call the above to function
  // we will call the above function when the client will emit events top create a room or join a room

  socket.on("create-room", createRoom);
  socket.on("joined-room", joinedRoom);
};

export default roomHandler;

// nodejs server will acts as a sfu - > single forwarding unit so that multiple users can join the same room
