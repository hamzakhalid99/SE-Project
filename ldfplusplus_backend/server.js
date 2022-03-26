const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()	
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.listen(3000, () => {
	console.log("Running on port 3000")
})