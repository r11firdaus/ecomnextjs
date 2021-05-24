import db from '../../../lib/db';
import { sort } from '../../../middleware/sort';

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end();
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).end()
    const splitAuth = authorization.split(' ')
    const apiKey = splitAuth[2]
    if (apiKey != process.env.API_KEY) return res.status(401).end()

    const { keyword } = req.query;
    const searchSplit = keyword.split('=')
    const searchSplitKey = searchSplit[1].split("+sort")
    const [searchKey] = [searchSplitKey[0], searchSplitKey[1]]

    // gabungkan kata yg terpisah oleh underscore
    const searchGabung1 = searchKey.replace(/_/g, " ").trim()
    // arrKey utk postgre
    const arrKey = searchGabung1.split(" ");

    // searchGabung2 & percobaan untuk mySQL
    // const searchGabung2 = searchKey.replace(/_/g, "|").trim()
    // const percobaan = searchGabung2.toString()

    const { sortReq } = await sort(keyword)

    let searchBarang;

    if (sortReq[0] !== null) {
        searchBarang = await db('tb_barang')
        .join('tb_subcategory', 'tb_subcategory.id_subcategory', 'tb_barang.id_subcategory')
        .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
        .select('id_barang', 'nama_barang', 'harga_barang', 'stok_barang', 'gambar_barang', 'status_barang', 'rating_barang', 'nama_user', 'kota_user' )
        .where(function() {
            this.where('nama_barang', 'ilike', `%${searchGabung1}%`)
            arrKey.map(key => this.orWhere('nama_barang', 'ilike', `%${key}%`))
            this.orWhere('nama_subcategory', 'ilike', `%${searchGabung1}%`)
            arrKey.map(key => this.orWhere('nama_subcategory', 'ilike', `%${key}%`))
        })
        .orderBy(sortReq[0], sortReq[1])
    } else {
        searchBarang = await db('tb_barang')
        .join('tb_subcategory', 'tb_subcategory.id_subcategory', 'tb_barang.id_subcategory')
        .join('tb_user', 'tb_user.id_user', 'tb_barang.id_seller')
        .select('id_barang', 'nama_barang', 'harga_barang', 'stok_barang', 'gambar_barang', 'status_barang', 'rating_barang', 'nama_user', 'kota_user' )
        .where(function() {
            this.where('nama_barang', 'ilike', `%${searchGabung1}%`)
            arrKey.map(key => this.orWhere('nama_barang', 'ilike', `%${key}%`))
            this.orWhere('nama_subcategory', 'ilike', `%${searchGabung1}%`)
            arrKey.map(key => this.orWhere('nama_subcategory', 'ilike', `%${key}%`))
        })
    }

    res.status(200);
    res.json({ data: searchBarang });
}

export default handler;

// const searchJadi = `%${searchGabung}%`
// .where('nama_barang', 'like', searchJadi)
// .orWhere('nama_subcategory', 'like', searchJadi)
// .whereRaw(`nama_barang REGEXP "${percobaan}"`)
// .orWhereRaw(`nama_subcategory REGEXP "${percobaan}"`)

//// kalau pakai mySQL
// .where('nama_barang', 'REGEXP', searchGabung1)
// .orWhere('nama_barang', 'REGEXP', percobaan)
// .orWhere('nama_subcategory', 'REGEXP', searchGabung1)
// .orWhere('nama_subcategory', 'REGEXP', percobaan) 
