import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') res.status(405).end()
    const {authorization} = req.headers;
    if (!authorization) res.status(401).end();

    const authSplit = authorization.split(' ')
    const authKey = authSplit[2]
    if(authKey !== process.env.API_KEY) res.status(401).end()

    const {id_subcategory} = req.query
    
    const reqSubCategory = await db()('tb_subcategory').where({id_subcategory}).first()
    res.status(200);
    res.json({data: reqSubCategory})
    res.end();
}

export default handler