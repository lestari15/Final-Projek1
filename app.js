const express = require("express");
const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', require('./routes/usersRoutes'))
app.use('/api/v1/reflections', require('./routes/reflectionroutes'))

app.listen(PORT, () => {
    console.log('Server is running on port'+PORT);
});
