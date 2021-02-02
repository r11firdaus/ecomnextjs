import db from '../../../lib/db';

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).end()
    const splitAuth = authorization.split(' ')
    const apiKey = splitAuth[2]
    if (apiKey != process.env.API_KEY) return res.status(401).end()


    const {id_barang} = req.query;

    const reqBarang = await db('tb_barang')
    .join('tb_subcategory', 'tb_subcategory.id_subcategory', 'tb_barang.id_subcategory')
    .select('*')
    .where({'tb_barang.id_barang': id_barang }).first()
    // id subcategory belum diubah ke nama subcategory
    
    res.status(200);
    if (!reqBarang) res.json({data: {}});
    res.json({
        data: reqBarang,
    });
}

export default handler;