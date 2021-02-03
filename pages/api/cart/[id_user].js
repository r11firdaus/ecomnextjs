import db from '../../../lib/db';
import authorization from '../../../middleware/authorization'

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    await authorization(req, res)

    const {id_user} = req.query;

    const reqBarang = await db('tb_cart')
    .join('tb_barang', 'tb_barang.id_barang', 'tb_cart.id_barang')
    .select('*')
    .where({'tb_cart.id_user': id_user }).orderBy('id_seller','desc')


    res.status(200);
    if (!reqBarang) res.json({data: []});
    res.json({
        data: reqBarang,
    });
}

export default handler;