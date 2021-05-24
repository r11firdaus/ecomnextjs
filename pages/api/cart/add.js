import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const {id_user, id_barang, total} = req.body
    const postCart = await db('tb_cart').insert({id_user, id_barang, total, checked: false})

    res.status(200);
    if (!postCart) res.json({data: []});
    res.json({
        data: 'Success !'
    });
}

export default handler;