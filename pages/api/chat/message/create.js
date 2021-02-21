import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const {id_chat, id_user, message} = req.body;

    const create = await db('tb_message').insert({
        id_chat, id_user, message
    });
    
    res.status(200);
    res.json({
        message: 'data created',
    });
}

export default handler;