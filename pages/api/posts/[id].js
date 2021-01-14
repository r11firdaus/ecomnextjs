import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();

    const { id } = req.query;
    const auth = await authorization(req, res);
    const post = await db('posts').where({id}).first();
    res.status(200);
    if(!post) return res.json({message: 'no data'}).end();
    res.json({
        message: 'Posts data',
        data: post,
    })
}

export default handler;