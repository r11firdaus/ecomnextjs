import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const {id_seller, nama_barang, harga_barang, stok_barang, id_subcategory} = req.body;

    const create = await db('tb_barang').insert({
        id_seller,
        nama_barang,
        harga_barang,
        stok_barang,
        id_subcategory
    });
    
    res.status(200);
    res.json({
        message: 'data created',
    });
}

export default handler;