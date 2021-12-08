import { Server } from "socket.io";

const socket = () => {
    const server = new Server({
        cors: {
            origin: "*",
        },
    });

    server.on("connection", (socket) => {
        console.log("new connection.", socket.id);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('login', (data) => {
            console.log(data)
            socket.join(data.email); // We are using room of socket io
        });

        socket.on("chat message", (data) => {
            server.emit("chat message", data);
        });

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

        // socket.on("room::join", ({ room }) => {
        //     socket.join(room);
        // });
    
        // socket.on("room::message::send", ({ room, message }) => {
        //     server.to(room).emit("room::message::send", { room, message });
        // });
    })

    
    server.listen(process.env.PORT_IO || 4242);
    console.log(`server started at ws://localhost:${process.env.PORT_IO || 4242}`);
}

export default socket