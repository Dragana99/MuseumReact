import React, {useEffect, useState} from 'react'

import { FormGroup, FormControl, Button, Container} from 'react-bootstrap';
import { addUser, isLoggedIn } from './utils';

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usersList, setUserList] = useState([])
	const [message, setMessage] = useState('')

	useEffect(() => {
		// proverava da li je korisnik vec ulogovan
		if (isLoggedIn()) {
			window.location.href = '/';
		}
	}, [])

	useEffect(() => {
		const getUsers = async () => {
			const usersListFile = await import("./usersList.json");
			setUserList(usersListFile.default)
		}
		getUsers();
	}, [])

	const handleSubmit = e => {
		e.preventDefault();
		const user = usersList.find(user => user.username === username && user.password === password);
		if (!user) {
			setMessage("Pogresan username ili password!");
			return;
		}
		addUser(user);
		setMessage("Uspesno ste se ulogovali!");
		setTimeout(() => {
			window.location.href = '/';
		}, 500)
	}
	return (
		<Container style={{padding: '3rem'}}>
				 <form onSubmit={handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="name"
																		required
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    className="add-new-form"
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </FormGroup>
                           
                           
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="password"
																		required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    className="add-new-form"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                          </FormGroup>
                            <Button  type="submit">Uloguj se</Button>
                            <div className = "after-add-museum"></div>
                        </form>

				{message && <div style={{color: 'orange'}}>{message}</div>}
		</Container>
	)
}

export default Login