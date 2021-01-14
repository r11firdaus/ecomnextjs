import db from '../../../lib/db'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if(req.method !== 'POST') return res.status(405).end();

    const {email, password} = req.body;

    const chkUser = await db('users').where({email}).first();
    if(!chkUser) return res.status(401).end();

    const chkPassword = await bcrypt.compare(password, chkUser.password);
    if(!chkPassword) return res.status(401).end();

    const token = jwt.sign({
        id: chkUser.id,
        email: chkUser.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.status(200);
    res.json({
        message: 'Login Success',
        token
    });

}

export default handler;