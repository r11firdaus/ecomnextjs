import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const { id_user } = req.query;

    const reqMsg = await db('tb_message')
    .select('id_message')
    .where({'receiver_user':id_user}).where({'status_message': 'unread'})

    res.status(200);
    res.json({ data: reqMsg })
}

export default handler;