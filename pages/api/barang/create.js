import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    await authorization(req, res)

    const {id_seller, nama_barang, harga_barang, stok_barang, id_subcategory, berat_barang, gambar_barang, status_barang, deskripsi_barang} = req.body;

    await db('tb_barang').insert({
        id_seller,
        nama_barang,
        harga_barang,
        stok_barang,
        id_subcategory,
        berat_barang,
        gambar_barang,
        status_barang,
        deskripsi_barang,
        terjual_barang: 0,
        rating_barang: 0

    });
    
    res.status(200);
    res.json({
        message: 'data created',
    });
}

export default handler;