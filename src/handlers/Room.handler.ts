import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import logger from "../config/logger.config";
import IRoomParams from "../interfaces/IRoomParams";

// the below map stores for a room what all peers have joined
const rooms: Record<string, string[]> = {};
const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = UUIDv4(); // this will be our unique room id in which multiple users can join
    socket.join(roomId); // joining the room
    rooms[roomId] = []; // creating a new room
    socket.emit("room-created", { roomId }); // emitting the room id to the user that socket is connected
    logger.info(`Room created with id ${roomId}`);
  };

  // the below function is execeuted when a user joins a new room
  const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      // if the given roomId exists in the in memory db
      logger.info(`New user joined with id ${roomId} with peer id ${peerId}`);
      rooms[roomId].push(peerId); // adding the peer id to the room
      socket.join(roomId); // joining the room

      // below event is for logging perpose
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }
  };

  // when to call the above to function
  // we will call the above function when the client will emit events top create a room or join a room
  socket.on("create-room", createRoom);
  socket.on("joined-room", joinedRoom);
};

export default roomHandler;

// nodejs server will acts as a sfu - > single forwarding unit so that multiple users can join the same room
