import db from '../../../lib/db';

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).end()
    const splitAuth = authorization.split(' ')
    const apiKey = splitAuth[2]
    if (apiKey != process.env.API_KEY) return res.status(401).end()

    const {id_barang} = req.query;

    const reqBarang = await db()('tb_barang')
    .join('tb_subcategory', 'tb_subcategory.id_subcategory', 'tb_barang.id_subcategory')
    .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
    .select('*')
    .where({'tb_barang.id_barang': id_barang }).first()
    
    res.status(200);
    if (!reqBarang) res.json({data: {}});
    res.json({data: reqBarang});
    res.end();
}

export default handler;