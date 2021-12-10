const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=e471cc3a3fd179cae31e6e586e6e588b&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			let timeOfDay = '';
			if (body.current.is_day === 'yes') {
				timeOfDay = 'day time';
			} else {
				timeOfDay = 'night time';
			}

			callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${timeOfDay}. It is ${body.current.temperature} degrees out but feels like ${body.current.feelslike} degrees out.`);
		}
	});
};

module.exports = forecast;
