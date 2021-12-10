const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
	e.preventDefault();

	const location = weatherForm.searchTerm.value;

	const URI = `/weather?address=${location}`;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch(URI).then(response => {
		response.json().then(data => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
