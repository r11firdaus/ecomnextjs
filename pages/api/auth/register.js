import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();

    const {email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    const register = await db('users').insert({
        email,
        password: passwordHashed
    })
    const registeredUser = await db('users').where({id: register}).first();
    res.status(200);
    res.json({
        message: 'User registration successfully',
        data: registeredUser
    })
}

export default handler;