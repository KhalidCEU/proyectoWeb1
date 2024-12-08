import 'dotenv';
import { User } from '../schemas/user';
import { AsyncRequestHandler } from '../types/requests';
import jwt from 'jsonwebtoken';



export const getUser: AsyncRequestHandler = async (req, res) => {
    const token = req.cookies;
    console.log(token);

    
    console.log(token.auth_token);
    const decode = jwt.verify(token.auth_token, process.env.JWT_SECRET as string);
    //console.log(decode.userId);

    
    const user = await User.findOne({ _id: decode.userId });

    console.log(user);
        
    res.json(user);

};




