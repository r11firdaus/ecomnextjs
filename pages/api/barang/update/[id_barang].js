import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'PUT') return res.status(405).end();
    const auth = await authorization(req, res);
    const {id_barang} = req.query;
    const {nama_barang, harga_barang, stok_barang, id_subcategory,berat_barang, gambar_barang, status_barang, deskripsi_barang} = req.body;


    await db('tb_barang').where({ id_barang }).update({
        nama_barang,
        harga_barang,
        stok_barang,
        id_subcategory,
        berat_barang,
        gambar_barang,
        status_barang,
        deskripsi_barang
    });
    
    res.status(200);
    res.json({
        message: 'data updated',
    });
}

export default handler;