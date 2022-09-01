const Users = require("./userModel");

exports.addUser = async (req, res) => {
    try {
        if (req.body.name && req.body.email && req.body.password) {
            console.log(req.body)
            const newUser = new Users(req.body);
            const token = await newUser.generateAuthToken();
            await newUser.save();
            // await Users.create({ name: req.body.name, email: req.body.email, password: req.body.password, token })
            res.status(201).send({ user: newUser.name, token })
        } else {
            console.log("no name, email and/or password entered")
            res.status(400).send({ error: "no name, email and/or password entered" })
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).send({ error: "Email already registered" })
        } else {
            console.log("error in addUser")
            res.status(500).send({ error: "internal server error" })
            console.log(error)
        }
    }
}

exports.listUsers = async (req, res) => {
    try {
        let userList = await Users.find({});
        if (userList.length > 0) {
            console.log("inside listUsers")
        res.status(200).send(await Users.find({}));
        } else {
            console.log("Nothing to display")
            res.status(400).send({error: "request failed, no users to display"})
        }
    } catch (error) {
        console.log("error in listUsers")
        res.status(500).send({error:"internal server error"})
        console.log(error)
    }
}


exports.userDeleteOne = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.filterByCredentials(email, password)
        if (user) {
        await Users.deleteOne({ email: user.email, password: user.password })
        res.status(200).send(await Users.find({}))
        } else {
            console.log("Nothing to delete")
            res.status(400).send({error: "request failed"})
        }
    } catch (error) {
        console.log("error in userDeleteOne")
        res.status(500).send({error:"internal server error"})
        console.log(error)
    }
}

exports.userDeleteMany = async (req, res) => {
    try {
        let userList = await Users.find({})
        if (userList.length > 0){
            await Users.deleteMany({userList})
            res.status(200).send("Contents deleted")
        }
        else {
            console.log("Nothing to delete")
            res.status(400).send({error: "request failed"})
        }
    } catch (error) {
        console.log("error in userDeleteMany")
        res.status(500).send({error:"internal server error"})
        console.log(error)
    }
}

exports.userEdit = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try{
        const user = await Users.filterByCredentials(email, password)
        await Users.updateOne({ name: req.body.name, email: user.email, password: user.password }, { name: req.body.newName, email: req.body.newEmail, password: req.body.newPass })
        res.status(200).send(await Users.find({}))
    } catch (error) {
        res.status(200).send(console.log("Failed to list items"))
        console.log(error)
    }
}

exports.nameEdit = async (req, res) => {
    try{
        if(req.user) {
            await Users.findByIdAndUpdate({ _id : req.user._id } ,{ $set : {name: req.body.name} })
            res.status(200).send(await Users.find({name: req.body.name}))
        } 
    } catch (error) {
            res.status(200).send(console.log("Failed to update items"))
            console.log(error)
    }
}

exports.emailEdit = async (req, res) => {
    try{
        if(req.user) {
            await Users.findByIdAndUpdate({_id : req.user._id} ,{ $set : {email: req.body.email} })
            res.status(200).send(await Users.find({email: req.body.email}))
        } 
    } catch (error) {
            res.status(200).send(console.log("Failed to update items"))
            console.log(error)
    }
}

exports.passwordEdit = async (req, res) => {
    try{
        if(req.user) {
            await Users.findByIdAndUpdate({_id : req.user._id} ,{ $set : {password: req.body.password} })
            res.status(200).send(await Users.find({password: req.body.password}))
        } 
    } catch (error) {
            res.status(200).send(console.log("Failed to update items"))
            console.log(error)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.filterByCredentials(email, password)
        const token = user.generateAuthToken()
        res.status(200).send({ user : user.name, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}