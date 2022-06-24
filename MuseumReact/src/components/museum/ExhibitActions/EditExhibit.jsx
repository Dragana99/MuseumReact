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
            picture: '',
            year: 0,          
            submitted: false,
            canSubmit: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params; 
        this.getExhibit(id);
    }

    getExhibit(id) {
        const requestOptions = {
            method: 'GET'
        };
    
        fetch(`${serviceConfig.baseURL}/api/Exhabit/` + id, requestOptions)
            .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({name: data.name,
                    picture: data.picture,
                    year: data.year,
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
        const {id, name, picture, year} = this.state;
        if (id, name && picture && year) {
            this.updateExhibit();
        } else {
            NotificationManager.error('Molim vas da unesete podatke!');
            this.setState({ submitted: false });
        }
    }
 
    updateExhibit() {
        const {id, name, picture, year} = this.state;
        const data = {
            name: name,
            picture: picture,
            year: year
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify("REQ_OPT:" + requestOptions.body));
    
        fetch(`${serviceConfig.baseURL}/api/Exhabit/${id}`, requestOptions)
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
                    picture: data.picture,
                    year: data.year
                    });
                }
            })
            .then(result => {
                this.props.history.goBack();
                NotificationManager.success('Uspesno izmenjeni podaci!');
            })
            .catch(response => {
                NotificationManager.error("Nije moguce izmeniti eksponat!");
                this.setState({ submitted: false });
            });
    }

    render() {
        const {name, picture, year, submitted, canSubmit} = this.state;
        return (
            <Container className="container-add-exhibit">
                <Row>
                    <Col>
                    <h1 className="form-header">IZMENI EKSPONAT</h1>
                        <form className="form-add-museum" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="name"
                                    type="text"
                                    placeholder="Naziv eksponata"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="picture"
                                    type="text"
                                    placeholder="URL adresa Fotografije"
                                    value={picture}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="year"
                                    type="number"
                                    placeholder="Godina"
                                    value={year}
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