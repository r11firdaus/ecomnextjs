import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const {id_user} = req.query;

    const reqBarang = await db()('tb_cart')
    .join('tb_barang', 'tb_barang.id_barang', 'tb_cart.id_barang')
    .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
    .select('tb_user.nama_user', 'tb_user.kota_user',
    'tb_barang.id_barang', 'tb_barang.nama_barang', 'tb_barang.harga_barang', 'tb_barang.stok_barang', 'tb_barang.id_seller',
    'tb_cart.id_cart', 'tb_cart.total', 'tb_cart.checked')
    .where({'tb_cart.id_user': id_user }).orderBy('id_seller','desc')

    res.status(200);
    res.json({data: reqBarang});
    res.end();
}

export default handler;