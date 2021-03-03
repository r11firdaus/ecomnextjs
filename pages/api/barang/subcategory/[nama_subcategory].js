import db from '../../../../lib/db'

const handler = async (req, res) => {
    if (req.method !== 'GET') res.status(405).end()
    const {authorization} = req.headers;
    if (!authorization) res.status(401).end();

    const authSplit = authorization.split(' ')
    const authKey = authSplit[2]
    if(!authKey || authKey !== process.env.API_KEY) res.status(401).end()

    const {nama_subcategory} = req.query
    const pisah = nama_subcategory.split('+')
    let sort = pisah[1] ? pisah[1] : ''
    
    res.status(200);
    const reqSubCategory = await db('tb_subcategory').where({'nama_subcategory': pisah[0]}).first()

    // if (reqSubCategory) {
        let sortReq = ['','']
        if (sort === '') sortReq = ['rating_barang', 'desc']
        if (sort === 'lowest') sortReq = ['harga_barang', 'desc']
        if (sort === 'highest') sortReq = ['harga_barang', 'asc']

        let reqBarang = await db('tb_barang').where({id_subcategory: reqSubCategory.id_subcategory}).orderBy(sortReq[0],sortReq[1])
        res.json({data: reqBarang})
    // } else res.json({data: []})
}

export default handler