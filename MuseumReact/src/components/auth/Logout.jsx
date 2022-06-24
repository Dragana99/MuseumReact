import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { logout } from './utils'

function Logout() {
	useEffect(() => {
		logout();
		setTimeout(() => {
			window.location.href = '/'
		}, 850)
	}, [])
	return (
		<Container>
			<h2>Odjava...</h2>
		</Container>
	)
}

export default Logout