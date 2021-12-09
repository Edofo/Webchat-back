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

    console.log(messages)
    console.log(rooms)
    console.log(users)
    
    server.on("connection", (socket) => {
        console.log("new connection.", socket.id);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('login', (data) => {
            createUser(users, data)
        });

        socket.on("room::join", ({ room, email1, email2 }) => {
            socket.join(room);
            // createRoom(rooms, users, room, email1, email2)
        });
    
        socket.on("room::message::send", ({ room, nick, message }) => {
            server.to(room).emit("room::message::receive", { user: nick, message: message, });
            // createMsg(rooms, users, messages, room, message, email1, email2)
        });

        

        // socket.on("chat message", (data) => {
        //     server.emit("chat message", data);
        // });

        // socket.on("room::join", ({ room }) => {
        //     const tab = {
        //         users: [
        //             {
        //                 email: ''
        //             },
        //             {
        //                 email: '',
        //             }
        //         ],
        //         message: [
        //             {
        //                 user: '',
        //                 content: ''
        //             },
        //             {
        //                 user: '',
        //                 content: ''
        //             }
        //         ]
        //     }

        //     console.log(room)
        //     socket.join(room);
        // });

        
    })

    
    server.listen(process.env.PORT_IO || 4242);
    console.log(`server started at ws://localhost:${process.env.PORT_IO || 4242}`);
}

export default socket