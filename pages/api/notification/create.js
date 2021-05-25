import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const { title, content } = req.body;

    const reqNotif = await db('tb_notification').insert({
        judul_notification: title,
        isi_notification: content,
    })

    res.status(200);
    res.json({ data: "Data saved!" })
}

export default handler;