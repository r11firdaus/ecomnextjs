import db from '../../../lib/db'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if(req.method !== 'POST') return res.status(405).end();

    const {email_user, password_user} = req.body;

    const chkUser = await db('tb_user').where({email_user}).first();
    if(!chkUser) return res.status(401).end();

    const chkPassword = await bcrypt.compare(password_user, chkUser.password_user);
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
        data: {
            email_user,
            token,
            id_user: chkUser.id_user
        }
    });

}

export default handler;