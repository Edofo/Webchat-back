import { Server } from "socket.io";
import createRoom from "../helpers/createRoom";
import createMsg from "../helpers/createMsg";
import createUser from "../helpers/createUser";

const messages = require('../db/messages.json')
const rooms = require('../db/rooms.json')
const users = require('../db/users.json')

const socket = () => {
    const server = new Server({
        cors: {
            origin: "*",
        },
    });
    
    server.on("connection", (socket) => {
        // console.log("new connection.", socket.id);

        socket.on('disconnect', () => {
            // console.log('user disconnected');
        });

        socket.on('login', (data) => {
            createUser(users, data)
        });

        socket.on("room::join", ({ room, email1, email2 }) => {
            // console.log(`${socket.id} join room ${room}`);
            socket.join(room);
            createRoom(rooms, users, room, email1, email2)
        });

        socket.on("room::message::get::list", ({ room }) => {
            try {

                const roomExist = rooms.filter((x) => x.name === room)
        
                if(roomExist[0] === undefined) {
                    return
                }

                const messagesList = messages.filter((x) => x.room_id === roomExist[0].id)
        
                server.to(room).emit('room::message::send::list', ({ messagesList }))
        
            } catch(err) {
                throw err
            }
        })
    
        socket.on("room::message::send", ({ room, nick, message, email1, email2, type }) => {
            // console.log(`${socket.id} send message to room ${room}`);
            server.to(room).emit("room::message::receive", { user: nick, message: message });
            createMsg(rooms, users, messages, room, message, email1, email2, type)
        });

        socket.on("room::leave", ({ room }) => {
            // console.log(`${socket.id} leave room ${room}`);
            socket.leave(room);
        });
    
    })
    
    server.listen(process.env.PORT_IO || 4242);
    console.log(`server started at ws://localhost:${process.env.PORT_IO || 4242}`);
}

export default socket