import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'POST') return res.status(405).end();

    const auth = await authorization(req, res);

    const {title, content} = req.body;
    const create = await db('posts').insert({
        title,
        content
    });

    //diberi first agar hanya satu hasil saja
    const createdData = await db('posts').where('id', create).first();

    res.status(200);
    res.json({
        message: 'Post create successfully',
        data: createdData
    })
}

export default handler;