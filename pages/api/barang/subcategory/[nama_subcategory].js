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

    if (reqSubCategory) {
        let sortReq = ['','']
        if (sort === '') sortReq = ['rating_barang', 'desc']
        if (sort === 'lowest') sortReq = ['harga_barang', 'desc']
        if (sort === 'highest') sortReq = ['harga_barang', 'asc']

        let reqBarang = await db('tb_barang').where({id_subcategory: reqSubCategory.id_subcategory})
        .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
        .select('tb_barang.id_barang', 'tb_barang.nama_barang', 'tb_barang.harga_barang', 'tb_barang.rating_barang', 'tb_barang.terjual_barang', 'tb_user.nama_user', 'tb_user.kota_user')
        .orderBy(sortReq[0],sortReq[1])
        res.json({data: reqBarang})
    } else res.json({data: []})
}

export default handler