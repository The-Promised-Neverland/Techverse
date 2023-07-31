import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        phone: "123456678",
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        phone: "123456678",
        isAdmin: false,
    },
    {
        profileImg: "_91408619_55df76d5-2245-41c1-8031-07a4da3f313f_chgtha",
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        phone: "123456678",
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;