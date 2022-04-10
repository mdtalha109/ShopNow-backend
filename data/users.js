import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'mdtalha@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'jane Doe',
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

export default users;