const express = require('express');
const gameRoutes = require('./routes/gameRoutes');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use('/api', gameRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
