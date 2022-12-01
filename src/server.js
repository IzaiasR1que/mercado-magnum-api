const app = require('express')();
require('dotenv').config();

app.use(require('express').json());
app.use(require('cors')());

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`😎 Server listening on port ${port}`);
});
