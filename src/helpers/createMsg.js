const createMsg = (rooms, users, messages, room, message, email1, email2) => {
    const roomExist = rooms.filter((x) => x.name === room)

    if(roomExist) {
        return
    }

    const user1Exist = users.filter((x) => x.email === email1)
    const user2Exist = users.filter((x) => x.email === email2)

    if(!user1Exist || !user2Exist) {
        return
    }

    const dateNow = new Date()

    messages.push({
        id: messages.length + 1,
        user_id: user1Exist.id,
        room_id: roomExist.id,
        usersList: [
            {
                user_id: user2Exist.id, 
            }
        ],
        content: message,
        created_at: dateNow
    })

    const json = JSON.stringify(messages)

    console.log(json)

    // fs.writeFile('myjsonfile.json', json, 'utf8')

    return
}

export default createMsg