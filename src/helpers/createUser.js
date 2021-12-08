const createUser = (users, data) => {
    const userExist = users.filter((x) => x.email === data.email)

    if(userExist) {
        return
    }

    users.push({
        id: users.length + 1,
        name: data.name,
        image: data.image,
        email: data.email
    })

    const json = JSON.stringify(users)

    console.log(json)

    // fs.writeFile('myjsonfile.json', json, 'utf8')

    return
}

export default createUser