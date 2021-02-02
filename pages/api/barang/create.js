import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const {id_user, nama_barang, harga_barang, stok_barang, nama_subcategory} = req.body;

    const reqSubCategory = await db('tb_subcategory').where({nama_subcategory}).first()
    const create = await db('tb_barang').insert({
        id_user,
        nama_barang,
        harga_barang,
        stok_barang,
        id_subcategory: reqSubCategory.id_subcategory
    });
    
    res.status(200);
    res.json({
        message: 'data created',
    });
}

export default handler;