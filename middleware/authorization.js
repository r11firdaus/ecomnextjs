import jwt from 'jsonwebtoken';

const authorization = (req, res) => {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end();
    
        // memisahkan Tulisan Bearer dgn kode token
        const authSpilt = authorization.split(' ');
        const [authType, authToken, apiKey] = [authSpilt[0], authSpilt[1], authSpilt[2]];
    
        if (authType !== 'Bearer') return res.status(401).end();
        if (apiKey != process.env.API_KEY) return res.status(401).end();
        
        return jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.status(401).end();
            return resolve(decoded);
        });
    });
}

export default authorization;