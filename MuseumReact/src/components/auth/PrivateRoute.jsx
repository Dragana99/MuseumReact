import React, { useEffect } from 'react'
import {Route} from "react-router-dom"
import { isLoggedIn } from './utils'

function PrivateRoute(props) {
	useEffect(() => {
		if (!isLoggedIn()) {
			window.location.href = '/login';
		}
	}, [])
	return (
		<Route {...props} />
	)
}

export default PrivateRoute