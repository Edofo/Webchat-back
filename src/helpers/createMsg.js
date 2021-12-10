import fs from 'fs'
import { type } from 'os'

const createMsg = (rooms, users, messages, room, message, email1, email2, type) => {

    try {

        const roomExist = rooms.filter((x) => x.name === room)


        if(roomExist[0] === undefined) {
            return
        }

        const user1Exist = users.filter((x) => x.email === email1)
        const user2Exist = users.filter((x) => x.email === email2)

        if(user1Exist[0] === undefined || user2Exist[0] === undefined) {
            return
        }
        
        const dateNow = new Date()

        messages.push({
            id: messages.length + 1,
            author_email: user1Exist[0].email,
            room_id: roomExist[0].id,
            type: type,
            usersList: [
                {
                    user_id: user2Exist[0].id, 
                }
            ],
            content: message,
            created_at: dateNow
        })

        const json = JSON.stringify(messages)

        fs.writeFile('src/db/messages.json', json, 'utf8', (err) => {
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

export default createMsg