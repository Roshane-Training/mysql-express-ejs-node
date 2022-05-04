const createForm = document.getElementsByName('createForm')[0]
const submitForm = document.forms['createForm']
const baseUrl = `${window.location.protocol}//${window.location.host}`

createForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new URLSearchParams()
	const formItems = {
		name: submitForm['name'].value,
		cohort: submitForm['cohort'].value,
		username: submitForm['username'].value,
		email_address: submitForm['email_address'].value,
		address_line1: submitForm['address_line1'].value,
		address_line2: submitForm['address_line2'].value,
		password: submitForm['password'].value,
		mailing_address1: submitForm['mailing_address1'].value,
		mailing_address2: submitForm['mailing_address2'].value,
		home_phone: submitForm['home_phone'].value,
	}

	formData.append('name', formItems.name)
	formData.append('cohort', formItems.cohort)
	formData.append('username', formItems.username)
	formData.append('email_address', formItems.email_address)
	formData.append('address_line1', formItems.address_line1)
	formData.append('address_line2', formItems.address_line2)
	formData.append('password', formItems.password)
	formData.append('mailing_address1', formItems.mailing_address1)
	formData.append('mailing_address2', formItems.mailing_address2)
	formData.append('home_phone', formItems.home_phone)

	fetch(`${baseUrl}/students/add`, { method: 'POST', body: formData })
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
					title: `${formItems.name} created!`,
				})

				setTimeout(() => location.assign('/students'), 3000)
			}
		})
		.catch((err) => {
			Swal.fire({
				title: `${formItems.name} can't be created!`,
				icon: 'error',
				showConfirmButton: false,
			})
		})
})
