import React from 'react';
import { FormGroup, FormControl, Button, Container, Row, Col, Form} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import '../../../App.css';
import {withRouter} from 'react-router-dom';
import DateTimePicker from "react-datetime-picker";
import { Typeahead } from "react-bootstrap-typeahead";


class EditMuseum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
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

    componentDidMount() {
        const { id } = this.props.match.params; 
        this.getExhibition(id);
        this.getAuditoriums();

    }


    getExhibition(id) {
        const requestOptions = {
            method: 'GET'
        };
    
        fetch(`${serviceConfig.baseURL}/api/Exhibit/` + id, requestOptions)
            .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({name: data.name,
                        description: data.description,
                    opening: data.opening,
                    image: data.image,
                    auditoriumId:data.auditoriumId,
                    exhabitId:data.exhabitId,
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
                const { name, description, opening, auditoriumId, image, exhabitId } = this.state;
                if (name && description && opening && auditoriumId && image && exhabitId) {
                this.updateExhibition();
        } else {
            NotificationManager.error('Molim vas da unesete podatke!');
            this.setState({ submitted: false });
        }
    }
 
    updateExhibition() {
        const { id,name, description, opening, auditoriumId, image, exhabitId } = this.state;
        const data = {
            name: name,
            description: description,
            opening: opening, 
            auditoriumId: auditoriumId,
            image:image,
            exhabitId: exhabitId
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify("REQ_OPT:" + requestOptions.body));
    
        fetch(`${serviceConfig.baseURL}/api/Exhibit/${id}`, requestOptions)
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
                        description: data.description,
                        opening: data.opening.toLocaleString(),
                        auditoriumId: data.auditoriumId,
                        image: data.image,
                        exhabitId: data.exhabitId,
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
        const { name, description, opening, auditoriums, image, submitted, canSubmit} = this.state;
        return (
            <Container className="container-add-museum">
                <Row>
                    <Col>
                    <h1 className="form-header">IZMENI Izlozbu</h1>
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