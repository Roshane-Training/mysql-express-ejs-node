const baseUrl = `${window.location.protocol}//${window.location.host}`

window.onload = () => {
	const deleteButtons = document.querySelectorAll('#deleteTrainer')

	deleteButtons.forEach((deleteButton) => {
		deleteButton.onclick = () => {
			const currentTrainerName = deleteButton.parentElement.parentElement.querySelectorAll('td')[2].textContent.trim()
			const trainerID = Number(deleteButton.parentElement.parentElement.querySelector('td').textContent.trim())

			console.log(currentTrainerName)
			console.log(trainerID)

			Swal.fire({
				title: `Do you want to delete ${currentTrainerName}?`,
				showCancelButton: true,
				confirmButtonText: 'Yes',
			}).then(async (result) => {
				if (result.isConfirmed) {
					await fetch(`${baseUrl}/trainers/delete/${trainerID}`, { method: 'DELETE' })
						.then((resp) => resp.json())
						.then((resp) => {
							console.log(resp)
							if (resp.message == 'success') {
								Swal.fire({
									toast: true,
									position: 'top-end',
									showConfirmButton: false,
									timer: 3000,
									timerProgressBar: true,
									icon: 'success',
									title: `${currentTrainerName} deleted!`,
								})

								setTimeout(() => location.assign('/trainers'), 3000)
							}
						})
				}
			})
		}
	})
}
