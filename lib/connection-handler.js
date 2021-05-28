import getDatabaseConnector from "./db";
const connector = getDatabaseConnector();

export default (...args) => {
    return (fn) => async (req, res) => {
        req.db = connector();
        await fn(req, res);
        await req.db.destroy();
        return;
    }
}