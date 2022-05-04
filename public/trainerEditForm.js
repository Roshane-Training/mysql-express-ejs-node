const editForm = document.getElementsByName('trainerEditForm')[0]
const submitForm = document.forms['trainerEditForm']
const baseUrl = `${window.location.protocol}//${window.location.host}`

editForm.addEventListener('submit', (e) => {
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

	fetch(`${baseUrl}/${editForm.getAttribute('action')}`, { method: 'PUT', body: formData })
		.then((resp) => resp.json())
		.then(async (resp) => {
			if (resp.message == 'success') {
				Swal.fire({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					icon: 'success',
					title: `Trainer ${formItems.first_name} updated!`,
				})

				setTimeout(() => location.assign('/trainers'), 3000)
			}
		})
		.catch((err) => {
			Swal.fire({
				title: `Trainer ${formItems.first_name} can't be updated!`,
				icon: 'error',
				showConfirmButton: false,
			})
		})
})
