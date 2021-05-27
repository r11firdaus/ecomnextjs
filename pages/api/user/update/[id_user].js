import db from '../../../../lib/db';
import authorization from '../../../../middleware/authorization'

const handler = async (req, res) => {
    if(req.method !== 'PUT') return res.status(405).end();
    const auth = await authorization(req, res);
    const {id_user} = req.query;
    const {
        email_user,
        password_user,
        nama_user,
        alamat_user,
        kecamatan_user,
        kota_user,
        provinsi_user,
        telepon_user
    } = req.body;


    const update = await db()('tb_user').where({ id_user }).update({
        email_user,
        password_user,
        nama_user,
        alamat_user,
        kecamatan_user,
        kota_user,
        provinsi_user,
        telepon_user
    });
    
    res.status(200);
    res.json({
        message: 'data updated',
    });
}

export default handler;