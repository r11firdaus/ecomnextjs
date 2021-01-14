import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();

    const auth = await authorization(req, res);
    const posts = await db('posts');
    res.status(200);
    res.json({
        message: 'Posts data',
        data: posts,
    })

}

export default handler;