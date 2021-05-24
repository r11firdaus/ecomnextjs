import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();

    const { email_user, password_user } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password_user, salt);

    const chkEmail = await db('tb_user').where({ email_user }).first()

    if (chkEmail) {
        res.json({ message: 'Email has been registered' })
        res.status(405).end();
    }

    const register = await db('tb_user').insert({
        email_user,
        password_user: passwordHashed
    })
    res.status(200);
    res.json({ message: 'User registration successfully' })
}

export default handler;