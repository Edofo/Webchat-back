const searchUser = (req, res) => {

    try {

        const users = require('../db/users.json')

        const emailSearch = req.body.search
        const emailUser = req.body.emailUser
        
        const usersList = []

        users.forEach((x) => {
            if (x.email.toLowerCase().indexOf(emailSearch.toLowerCase()) > -1) {
                if(x.email === emailUser) {
                    return
                }
                usersList.push(x)
            }
        })

        res.status(200).json(usersList)

    } catch(err) {
        throw err
    }

}

export default searchUser