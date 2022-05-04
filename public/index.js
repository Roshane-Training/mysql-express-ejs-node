const baseUrl = `${window.location.protocol}//${window.location.host}`

window.onload = () => {
	const deleteButton = document.querySelector('#deleteStudent')

	deleteButton.onclick = () => {
		const currentStudentName = deleteButton.parentElement.parentElement.childNodes[3].textContent.trim()
		const studentID = Number(deleteButton.parentElement.parentElement.childNodes[1].textContent.trim())

		Swal.fire({
			title: `Do you want to delete ${currentStudentName.split(' ')[0]}?`,
			showCancelButton: true,
			confirmButtonText: 'Yes',
		}).then(async (result) => {
			if (result.isConfirmed) {
				await fetch(`${baseUrl}/students/delete/${studentID}`, { method: 'DELETE' })
					.then((resp) => resp.json())
					.then((resp) => {
						console.log(resp)
						if (resp.message == 'success') {
							// Swal.fire('Deleted!', '', 'success')
							Swal.fire({
								toast: true,
								position: 'top-end',
								showConfirmButton: false,
								timer: 3000,
								timerProgressBar: true,
								icon: 'success',
								title: `${currentStudentName} deleted!`,
							})

							setTimeout(() => location.assign('/students'), 3000)
						}
					})
			} else if (result.isDenied) {
				Swal.fire('Canceled', '', 'error')
			}
		})
	}
}
