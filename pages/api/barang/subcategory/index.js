import db from '../../../../lib/db'

const handler = async (req, res) => {
    if (req.method !== 'GET') res.status(405).end()
    // const {authorization} = req.headers;
    // // if (!authorization) res.status(401).end();
    
    // const authSplit = authorization.split(' ')
    // const authKey = authSplit[2]
    // if(authKey !== process.env.API_KEY) res.status(401).end()
    
    const reqsubcategory = await db()('tb_subcategory')
    res.status(200);
    // console.log(req.headers)
    res.json({data: reqsubcategory})
    res.end();
}

export default handler