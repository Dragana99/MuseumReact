import React from 'react';
import { FormGroup, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../../appSettings';
import '../../../App.css';
import {withRouter} from 'react-router-dom';


class EditMuseum extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
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

    componentDidMount() {
        const { id } = this.props.match.params; 
        this.getMuseum(id);
    }

    getMuseum(id) {
        const requestOptions = {
            method: 'GET'
        };
    
        fetch(`${serviceConfig.baseURL}/api/Museums/` + id, requestOptions)
            .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({name: data.name,
                    address: data.address,
                    city: data.city,
                    email: data.email,
                    phone:data.phone,
                    id: data.id});
                }
            })
            .catch(response => {
                NotificationManager.error("Doslo je do greske!");
                this.setState({ submitted: false });
            });
        }
    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
            }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const {id,name, address, city, email, phone} = this.state;
        if (id, name && address && city && email && phone) {
            this.updateMuseum();
        } else {
            NotificationManager.error('Molim vas da unesete podatke!');
            this.setState({ submitted: false });
        }
    }
 
    updateMuseum() {
        const {id, name, address, city, email, phone} = this.state;
        const data = {
            name: name,
            address: address,
            city: city, 
            email: email,
            phone:phone
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify("REQ_OPT:" + requestOptions.body));
    
        fetch(`${serviceConfig.baseURL}/api/Museums/${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(data => {
                if(data){
                    this.setState({
                    name: data.name,
                    address: data.address,
                    city: data.city,
                    email: data.email,
                    phone:data.phone,
                    id: data.id
                    });
                }
            })
            .then(result => {
                this.props.history.goBack();
                NotificationManager.success('Uspesno izmenjeni podaci!');
            })
            .catch(response => {
                NotificationManager.error("Nije moguce izmeniti muzej!");
                this.setState({ submitted: false });
            });
    }

    render() {
        const {name, address, city, email, phone, submitted, canSubmit} = this.state;
        return (
            <Container className="container-add-museum">
                <Row>
                    <Col>
                    <h1 className="form-header">IZMENI MUZEJ</h1>
                        <form className="form-add-museum" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="name"
                                    type="text"
                                    placeholder="Naziv muzeja"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="address"
                                    type="text"
                                    placeholder="Adresa"
                                    value={address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="city"
                                    type="text"
                                    placeholder="Grad"
                                    value={city}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="phone"
                                    type="text"
                                    placeholder="Telefon"
                                    value={phone}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button  variant="danger" type="submit" disabled={submitted || !canSubmit}>Izmeni</Button>
                            <div className = "after-add-museum"></div>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(EditMuseum);