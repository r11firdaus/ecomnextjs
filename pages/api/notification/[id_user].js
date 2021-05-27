import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const { id_user } = req.query;

    const reqNotif = await db()('tb_notifrecord')
    .join('tb_notification', 'tb_notifrecord.id_notification', 'tb_notification.id_notification')
    .select('*')
    .where({ 'tb_notifrecord.id_user': id_user })

    res.status(200);
    res.json({ data: reqNotif })
}

export default handler;