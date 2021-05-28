import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'DELETE') return res.status(405).end();
    await authorization(req, res);

    const {id_barang} = req.query;

    await db()('tb_barang').where({ id_barang }).del()
    
    res.status(200);
    res.json({message: 'data deleted'});
    res.end();
}

export default handler;