import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();

    const {
        email_user,
        password_user,
        nama_user,
        telepon_user
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password_user, salt);

    const register = await db('tb_user').insert({
        email_user,
        password_user: passwordHashed,
        nama_user,
        telepon_user
    })
    const registeredUser = await db('tb_user').where({id_user: register}).first();
    res.status(200);
    res.json({
        message: 'User registration successfully',
        data: registeredUser
    })
}

export default handler;