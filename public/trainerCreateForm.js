const createForm = document.getElementsByName('trainerCreateForm')[0]
const submitForm = document.forms['trainerCreateForm']
const baseUrl = `${window.location.protocol}//${window.location.host}`

createForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new URLSearchParams()
	const formItems = {
		title: submitForm['title'].value,
		first_name: submitForm['first_name'].value,
		last_name: submitForm['last_name'].value,
	}

	formData.append('title', formItems.title)
	formData.append('first_name', formItems.first_name)
	formData.append('last_name', formItems.last_name)

	fetch(`${baseUrl}/trainers/add`, { method: 'POST', body: formData })
		.then((resp) => resp.json())
		.then(async (resp) => {
			if (resp.message == 'success') {
				Swal.fire({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
					icon: 'success',
					title: `Trainer ${formItems.first_name} created!`,
				})

				setTimeout(() => location.assign('/trainers'), 2000)
			}
		})
		.catch((err) => {
			Swal.fire({
				title: `Trainer ${formItems.first_name} can't be created!`,
				icon: 'error',
				showConfirmButton: false,
			})
		})
})
