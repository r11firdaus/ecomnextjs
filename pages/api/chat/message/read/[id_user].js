import db from '../../../../../lib/db';
import authorization from '../../../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'PUT') return res.status(405).end();
    await authorization(req, res);

    const {id_user} = req.query;
    const {id_chat} = req.body;

    const putStatus = await db()('tb_message').where({'receiver_user': id_user})
    .where({id_chat}).where({'status_message': 'unread'})
    .update({
        status_message: 'read'
    });

    res.status(200);
    res.json({
        message: 'Message readed',
    });
    res.end();
}

export default handler;