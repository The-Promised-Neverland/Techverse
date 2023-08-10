import jwt from "jsonwebtoken";


const generateToken = (userId)=> {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });


    //Set JWT as HTTP- Only cookie
    return token;
}

export default generateToken;