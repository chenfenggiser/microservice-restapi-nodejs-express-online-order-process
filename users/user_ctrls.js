const User  = require('./user_model')

const createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: "failed" })
    }

    user
        .save()
        .then(() => {

            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'user created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}


const deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params._id }, (err, user) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

        return res.status(200).json({ success: true, info: "user deleted" })
    }).catch(err => console.log(err))
}

const getUserById = async (req, res) => {

    await User.findOne({_id: req.params._id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        return res.status(200).json({ data: user })
    }).catch(err => console.log(err))
}

const getUsers = async (req, res) => {

    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` })
        }
        return res.status(200).json({ data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    deleteUser,
    getUserById,
    getUsers
}
