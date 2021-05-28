import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const { id_notification, id_user } = req.body;

    const sendNotif = id_user.map(async id => {
        await db()('tb_notifrecord').insert({
            id_notification,
            id_user: id,
        })
    }) 

    res.status(200);
    res.json({ data: "Notification sent!" })
    res.end();
}

export default handler;