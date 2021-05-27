import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const {id_chat} = req.query;

    const reqChat = await db()('tb_message')
    .join('tb_user', 'tb_user.id_user', 'tb_message.id_user')
    .select("*")
    .where({'tb_message.id_chat': id_chat }).orderBy('id_message')

    res.status(200);
    res.json({data: reqChat})
}

export default handler;