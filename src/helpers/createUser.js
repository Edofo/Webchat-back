import fs from 'fs'

const createUser = (users, data) => {

    try {

        const userExist = users.filter((x) => x.email === data.email)
        
        if(userExist[0] !== undefined) {
            return
        }
        
        users.push({
            id: users.length + 1,
            name: data.name,
            image: data.image,
            email: data.email
        })
    
        const json = JSON.stringify(users)
        
        fs.writeFile('src/db/users.json', json, 'utf-8', (err) => {
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

export default createUser