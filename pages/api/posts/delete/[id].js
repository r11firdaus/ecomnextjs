import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'DELETE') return res.status(405).end();
    const auth = await authorization(req, res)
    const {id} = req.query;

    const deletePost = await db('posts').where({ id }).del();
    
    res.status(200);
    res.json({
        message: 'data deleted',
    });
}

export default handler;