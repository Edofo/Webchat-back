import fs from 'fs'

const createRoom = (rooms, users, room, email1, email2) => {

    try {

        const roomExist = rooms.filter((x) => x.name === room)

        if(roomExist[0] !== undefined) {
            return
        }

        const user1Exist = users.filter((x) => x.email === email1)
        const user2Exist = users.filter((x) => x.email === email2)

        if(user1Exist[0] === undefined || user2Exist[0] === undefined) {
            return
        }

        rooms.push({
            id: rooms.length + 1,
            name: room,
            usersList: [
                {
                    "user_id": user1Exist[0].id, 
                },
                {
                    "user_id": user2Exist[0].id, 
                }
            ]
        })

        const json = JSON.stringify(rooms)

        fs.writeFile('src/db/rooms.json', json, 'utf8', (err) => {
            console.log(err)
            if (err) {
                return
            }
            console.log('Data written to file')
        })

        return

    } catch(err) {
        throw err
    }

}

export default createRoom