const createRoom = (rooms, users, room, email1, email2) => {
    const roomExist = rooms.filter((x) => x.name === room)

    if(roomExist) {
        return
    }

    const user1Exist = users.filter((x) => x.email === email1)
    const user2Exist = users.filter((x) => x.email === email2)

    if(!user1Exist || !user2Exist) {
        return
    }

    rooms.push({
        id: rooms.length + 1,
        name: room,
        usersList: [
            {
                "user_id": user1Exist.id, 
            },
            {
                "user_id": user2Exist.id, 
            }
        ]
    })

    const json = JSON.stringify(rooms)

    console.log(json)

    // fs.writeFile('myjsonfile.json', json, 'utf8')

    return
}

export default createRoom