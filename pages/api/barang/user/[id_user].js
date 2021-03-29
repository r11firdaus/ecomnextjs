import db from '../../../../lib/db'
import { sort } from '../../../../middleware/sort';

const handler = async (req, res) => {
    if (req.method !== 'GET') res.status(405).end();
    const {authorization} = req.headers;
    if (!authorization) res.status(401).end();

    const authSplit = authorization.split(' ')
    const authKey = authSplit[2]
    if (!authKey || authKey !== process.env.API_KEY) res.status(401).end()

    const {id_user} = req.query
    const pisah = id_user.split('+sort')
    const {sortReq} = await sort(id_user)

    let reqBarangUser;
    if (sortReq[0] !== null) {
        reqBarangUser = await db('tb_barang')
        .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
        .select(
            'tb_barang.id_barang',
            'tb_barang.id_seller',
            'tb_barang.nama_barang',
            'tb_barang.gambar_barang',
            'tb_barang.harga_barang',
            'tb_barang.terjual_barang',
            'tb_barang.rating_barang',
            'tb_user.nama_user',
            'tb_user.kota_user',
        )
        .where({'id_seller':pisah[0]}).orderBy(sortReq[0],sortReq[1])
    } else {
        reqBarangUser = await db('tb_barang')
        .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
        .select(
            'tb_barang.id_barang',
            'tb_barang.id_seller',
            'tb_barang.nama_barang',
            'tb_barang.gambar_barang',
            'tb_barang.harga_barang',
            'tb_barang.terjual_barang',
            'tb_barang.rating_barang',
            'tb_user.nama_user',
            'tb_user.kota_user',
        )
        .where({'id_seller':pisah[0]})
    }


    res.status(200);
    res.json({data: reqBarangUser})
}

export default handler