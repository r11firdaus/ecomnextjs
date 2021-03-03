import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const { id_user } = req.query;

    const reqMsg = await db('tb_message')
        .join('tb_user', 'tb_user.id_user', 'tb_message.id_user')
        .select('tb_user.nama_user', 'tb_message.id_message', 'tb_message.id_chat', 'tb_message.id_user', 'tb_message.receiver_user', 'tb_message.message', 'tb_message.status_message')
        .where({ 'receiver_user': id_user }).orWhere({'tb_message.id_user': id_user})
        .orderBy('id_message', 'desc')

    res.status(200);
    res.json({ data: reqMsg })
}

export default handler;