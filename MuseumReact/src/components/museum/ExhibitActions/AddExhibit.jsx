import React from 'react';
import { FormGroup, FormControl, Button, Container, Row, Col} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import '../../../App.css';
import {withRouter} from 'react-router-dom';


class AddExhibit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            picture: '',
            year: 0,
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
        const { name , picture, year} = this.state;
        if (name && picture && year) {
            this.newExhibit();
        } else {
            NotificationManager.error('Popunite sva polja!');
            this.setState({ submitted: false });
        }
    };

    newExhibit() {
        const {name, picture, year} = this.state;
            console.log(this.state);

        const data = {
            name: name,
            picture: picture,
            year: year
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
           ,
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/api/Exhabit`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(result => {
                console.log(result);
                NotificationManager.success('Uspešno upisani podaci!');
                this.props.history.push(`/exhibits`);
            })
            .catch(response => {
                NotificationManager.error("Proverite konkeciju! Nije moguće upisati podatke!");
                this.setState({ submitted: false });
            });
    }
    

    render() {
        const {name,picture, year, submitted, canSubmit} = this.state;
        return (

            <Container className="container-add-exhibit">
                <Row className="new-row">
                    <Col>
                    <h1 className="form-header">DODAJ NOVI EKSPONAT</h1>
                        <form className="form-add-museum" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="name"
                                    type="text"
                                    placeholder="Naziv eksponata"
                                    value={name}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                           
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="picture"
                                    type="text"
                                    placeholder="URL fotografije"
                                    value={picture}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="year"
                                    type="number"
                                    placeholder="Godina"
                                    value={year}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                          </FormGroup>
                            <Button  type="submit" disabled={submitted || !canSubmit}>Dodaj eksponat</Button>
                            <div className = "after-add-museum"></div>
                        </form>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default withRouter(AddExhibit);