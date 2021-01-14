import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'PUT') return res.status(405).end();
    const auth = await authorization(req, res);
    const {id} = req.query;
    const {title, content} = req.body;

    const update = await db('posts').where({ id }).update({title, content});
    
    const updatedData = await db('posts').where({ id });

    res.status(200);
    res.json({
        message: 'data updated',
        data: updatedData
    });
}

export default handler;