const editForm = document.getElementsByName('editForm')[0]
const submitForm = document.forms['editForm']
const student_id = Number(editForm.getAttribute('data-student-id'))
const baseUrl = `${window.location.protocol}//${window.location.host}`

editForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new URLSearchParams()
	const formItems = { name: submitForm['name'].value, username: submitForm['username'].value, email_address: submitForm['email_address'].value }

	formData.append('name', formItems.name)
	formData.append('username', formItems.username)
	formData.append('email_address', formItems.email_address)

	fetch(`${baseUrl}/students/update/${student_id}`, { method: 'PUT', body: formData })
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
					title: `${formItems.name} Updated!`,
				})

				fetch(`${baseUrl}/students/${student_id}`)
					.then((resp) => resp.json())
					.then((resp) => {
						const newForm = document.forms['editForm']
						const { name, username, email_address } = resp.data[0]

						newForm['name'].value = name
						newForm['username'].value = username
						newForm['email_address'].value = email_address

						setTimeout(() => location.assign('/students'), 3000)
					})
			}
		})
		.catch((err) => {
			Swal.fire({
				title: `${formItems.name} Updated!`,
				icon: 'success',
				showConfirmButton: false,
			})
		})
})
