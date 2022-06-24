import React from 'react';
import { FormGroup, FormControl, Button, Container, Row, Col, Form} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import '../../../App.css';
import {withRouter} from 'react-router-dom';
import DateTimePicker from "react-datetime-picker";
import { Typeahead } from "react-bootstrap-typeahead";




class AddExhibition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            opening: '',
            auditoriumId: 0,
            image: '',
            auditoriums: [],
            date: '',
            exhabitId: '8bc2f2f9-4b7e-4c6e-3bb5-08d9d2c89d2a',
            submitted: false,
            canSubmit: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAuditoriumChange = this.onAuditoriumChange.bind(this);
        this.onDateChange  = this.onDateChange.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    componentDidMount() {
        this.getAuditoriums();
     }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { name, description, opening, auditoriumId, image, exhabitId } = this.state;
        if (name && description && opening && auditoriumId && image && exhabitId) {
            this.newExhibition();
        } else {
            NotificationManager.error('Popunite sva polja!');
            this.setState({ submitted: false });
        }
    };

    newExhibition() {
        const {name, description, opening, auditoriumId, image, exhabitId} = this.state;
            console.log(this.state);

        const data = {
            name: name,
            description: description,
            opening: opening.toLocaleString(),
            auditoriumId: auditoriumId,
            image: image,
            exhabitId: exhabitId,
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

        fetch(`${serviceConfig.baseURL}/api/Exhibit`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(result => {
                console.log(result);
                NotificationManager.success('Uspešno upisani podaci!');
                this.props.history.push(`/exhibitions`);
            })
            .catch(response => {
                NotificationManager.error("Nije moguće upisati podatke!");
                this.setState({ submitted: false });
            });
    }
    
    getAuditoriums() {
        const requestOptions = {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        };
  
        fetch(`${serviceConfig.baseURL}/api/Auditoriums`, requestOptions)
          .then(response => {
            if (!response.ok) {
              return Promise.reject(response);
          }
          return response.json();
          })
          .then((data) =>{
            if (data) {
              this.setState((prevData) => ({...prevData, auditoriums:data}));
            }
          })
          .catch((response) => {
            NotificationManager.error(response.message || response.statusText);
            this.setState((prevData) => ({...prevData, submitted:false}));
          });
        };

      onAuditoriumChange (auditoriums) {
        if (auditoriums[0]) {
          this.setState((prevData) => ({...prevData, auditoriumId: auditoriums[0].id }));
        } else {
          this.validate("auditoriumId", null);
        }
      };

      onDateChange(date){
        this.setState((prevData) => ({...prevData, opening: date}));
      };

    render() {
        const {name, description, opening, auditoriumId, image, exhabitId,auditoriums, submitted, canSubmit} = this.state;
        return (

            <Container className="container-add-museum">
                <Row className="new-row">
                    <Col>
                    <h1 className="form-header">DODAJ NOVU IZLOZBU</h1>
                        <form className="form-add-museum" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="name"
                                    type="text"
                                    placeholder="Naziv Izlozbe"
                                    value={name}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                            <Typeahead
                                labelKey="name"
                                className="add-new-form"
                                options={auditoriums}
                                placeholder="Izaberite auditorium..."
                                id="auditorium"
                                onChange={this.onAuditoriumChange}
                                />
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <FormControl
                                    id="description"
                                    type="text"
                                    placeholder="Opis"
                                    value={description}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    id="image"
                                    type="text"
                                    placeholder="Slika"
                                    value={image}
                                    className="add-new-form"
                                    onChange={this.handleChange}
                                />
                          </FormGroup >
                            <FormGroup>
                                <DateTimePicker
                                    className="form-control add-new-form"
                                        format="yyyy/MM/d HH:mm"
                                        onChange={this.onDateChange} 
                                        value={opening}
                                    />
                            </FormGroup>
                            <Button  type="submit" disabled={submitted || !canSubmit}>Dodaj izlozbu</Button>
                            <div className = "after-add-museum"></div>
                        </form>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default withRouter(AddExhibition);