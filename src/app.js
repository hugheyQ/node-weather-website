const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //create express application
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Hubert Quarshie',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Hubert Quarshie',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		helpText: 'Welcome to the help page!',
		name: 'Hubert Quarshie',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address',
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
				Address: req.query.address,
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'Help article not found',
		name: 'Hubert Quarshie',
		title: '404',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: 'Page not found',
		name: 'Hubert Quarshie',
		title: '404',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port${port}`);
});
