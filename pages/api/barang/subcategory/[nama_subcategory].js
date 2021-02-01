import db from '../../../../lib/db'

const handler = async (req, res) => {
    if (req.method !== 'GET') res.status(405).end()
    const {authorization} = req.headers;
    if (!authorization) res.status(401).end();

    const authSplit = authorization.split(' ')
    const authKey = authSplit[2]
    if(!authKey || authKey !== process.env.API_KEY) res.status(401).end()

    const {nama_subcategory} = req.query
    
    res.status(200);
    const reqSubCategory = await db('tb_subcategory').where({nama_subcategory}).first()
    if (reqSubCategory) {
        const reqBarang = await db('tb_barang').where({id_subcategory: reqSubCategory.id_subcategory})
        res.json({data: reqBarang})
    } else res.json({data: []})
}

export default handler