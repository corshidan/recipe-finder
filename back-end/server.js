const app = require('./app');
const port = 5000;

app.listen(process.env.PORT || port, () => {
	console.log(`the server is listening at port ${port}`);
});
