import React from 'react';
import { FormGroup, FormControl, Button, Container, Row, Col, Form} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import '../../../App.css';
import {withRouter} from 'react-router-dom';


class AddMuseum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            city: '',
            email: '',
            phone: '',
            submitted: false,
            canSubmit: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { name, address, city, email, phone} = this.state;
        if (name && address && city && email && phone) {
            this.newMuseum();
        } else {
            NotificationManager.error('Popunite sva polja!');
            this.setState({ submitted: false });
        }
    };

    newMuseum() {
        const {name,
        address,
        city,
        email,
        phone} = this.state;
            console.log(this.state);

        const data = {
            name: name,
            address: address,
            city: city,
            email: email,
            phone : phone
        };

            console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
           ,
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/api/Museums`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(result => {
                console.log(result);
                NotificationManager.success('Uspešno upisani podaci!');
                this.props.history.push(`/museums`);
            })
            .catch(response => {
                NotificationManager.error("Nije moguće upisati podatke!");
                this.setState({ submitted: false });
            });
    }
    

    render() {
        const {name,
            address,
            city,
            email,
            phone, submitted, canSubmit} = this.state;
        return (

            <Container className="container-add-museum">
                <Row className="new-row">
                    <Col>
                    <h1 className="form-header">DODAJ NOVI MUZEJ</h1>
                        <form className="form-add-museum" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="name"
                                    type="text"
                                    placeholder="Naziv muzeja"
                                    value={name}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                           
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="address"
                                    type="text"
                                    placeholder="Adresa"
                                    value={address}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="city"
                                    type="text"
                                    placeholder="Grad"
                                    value={city}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                          </FormGroup >
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="email"
                                    type="text"
                                    placeholder="E-mail"
                                    value={email}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="phone"
                                    type="text"
                                    placeholder="Tel."
                                    value={phone}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button  type="submit" disabled={submitted || !canSubmit}>Dodaj muzej</Button>
                            <div className = "after-add-museum"></div>
                        </form>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default withRouter(AddMuseum);