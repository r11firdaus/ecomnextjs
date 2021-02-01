import db from '../../../../lib/db'

const handler = async (req, res) => {
    if (req.method !== 'GET') res.status(405).end()
    const {authorization} = req.headers;
    if (!authorization) res.status(401).end();

    const authSplit = authorization.split(' ')
    const authKey = authSplit[2]
    if(!authKey || authKey !== process.env.API_KEY) res.status(401).end()

    const {nama_category} = req.query
    
    res.status(200);
    const reqCategory = await db('tb_category').where({nama_category}).first()
    if (reqCategory) {
        const reqSubCategory = await db('tb_subcategory').where({id_category: reqCategory.id_category})
        res.json({data: reqSubCategory})
    } else res.json({data: []})
}

export default handler