import db from '../../../lib/db'

const handler = async (req, res) => {
    if (req.method !== 'GET') res.status(405).end()
    const {authorization} = req.headers;
    if (!authorization) res.status(401).end();

    const authSplit = authorization.split(' ')
    const authKey = authSplit[2]
    if(!authKey || authKey !== process.env.API_KEY) res.status(401).end()
    
    const reqCategory = await db('tb_category')

    res.status(200);
    res.json({data: reqCategory})
}

export default handler