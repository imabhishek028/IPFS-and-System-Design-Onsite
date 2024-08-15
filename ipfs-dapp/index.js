const express = require('express');
const multer = require('multer');
const { create } = require('ipfs-http-client');

const app = express();
const port = 6000;

const ipfs = create({ url: 'http://localhost:6000' });

const upload = multer({ storage: multer.memoryStorage() });
app.use(express.static('public'));

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const file = req.file.buffer;
        const result = await ipfs.add(file);
        const cid = result.path;
        return res.status(200).json({ cid, url: `https://ipfs.io/ipfs/${cid}` });
    } catch (error) {
        res.status(500).send('Error uploading file.');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
