import db from '../../../lib/db';
// import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    // await authorization(req, res)

    const reqNotif = await db()('tb_notification')

    res.status(200);
    res.json({ data: reqNotif })
}

export default handler;