const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    try{
        const body = req.body;
        if(!body.redirectURL) {
            return res.status(400).json({ error: 'redirectURL is required' });
        }
        const shortId = nanoid(8);
       
        await URL.create({
            shortId,
            redirectURL: req.body.redirectURL,
            visitHistory: [],
            createdBy: req.user._id,
        });
        return res.render('home', {id: shortId})
    } catch (error) {
        console.error('Error generating new short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleGenerateNewShortURL
};