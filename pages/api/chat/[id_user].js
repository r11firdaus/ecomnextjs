import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const { id_user } = req.query;

    const reqMsg = await db('tb_chat')
        .join('tb_user', 'tb_user.id_user', 'tb_chat.id_user1')
        .select('tb_user.nama_user', 'tb_user.id_user', 'tb_chat.id_chat')
        .where({ 'tb_chat.id_user2': id_user })

    const reqMsg2 = await db('tb_chat')
        .join('tb_user', 'tb_user.id_user', 'tb_chat.id_user2')
        .select('tb_user.nama_user', 'tb_user.id_user', 'tb_chat.id_chat')
        .where({ 'tb_chat.id_user1': id_user })

    let result = []

    res.status(200);

    if (reqMsg.length != 0) {
        reqMsg.map(msg => {
            result.push(msg);
        })
    }
    if (reqMsg2 != 0) {
        reqMsg2.map(msg => {
            result.push(msg);
        })
    }

    res.json({ data: result })
}

export default handler;