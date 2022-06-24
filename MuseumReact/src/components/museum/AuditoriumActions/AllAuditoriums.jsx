import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import { Container, Card, CardGroup, Button,ResponsiveEmbed, CardDeck, Table} from 'react-bootstrap';

class AllAuditoriums extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auditoriums: [],
        filteredAuditoriums: [],
        auditoriumFilter: '',
      };
      this.filterAuditoriums = this.filterAuditoriums.bind(this);
    }

    componentDidMount() {
       this.getAuditoriums();
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
        .then(data => {
          NotificationManager.success('Uspešno učitani podaci!');
          if (data) {
            this.setState({ 
                auditoriums: data,
                filteredAuditoriums: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error("Proverite konkeciju! Nije moguće prikupiti podatke!");
            this.setState({ submitted: false });
        });
    }

    filterAuditoriums(e) {
      e.preventDefault();
      const filteredAuditoriums = this.state.auditoriums.filter(auditorium => auditorium.name.toLowerCase().includes(this.state.auditoriumFilter.toLowerCase()));
      console.log('called', filteredAuditoriums);
      this.setState({filteredAuditoriums});
    };

    showAuditoriums() {
      return this.state.filteredAuditoriums.map(auditorium => {
          return <tr key={auditorium.id} className="card-content">
    <td><Card.Img variant="top" src="https://rs.n1info.com/wp-content/uploads/2020/11/muzej-jugoslavije-346472.jpeg" height="500"/></td>
      <td>{auditorium.name}</td>
     <td>Izložbena sala: Za izložbe u trajanju od 10 dana cena je 50.000,00 dinara.<br></br> Za skupove prvi sat 4.000,00 dinara,a svaki naredni 5.000,00 dinara.<br></br> Za modne revije, snimanje spota i sl. 30.000,00 dinara u trajanju od 5 dana.<br></br> Kontakt telefon za iznajmiljivanje:+381255255</td>
    <td>
      <small className="text-muted">ID Muzeja: {auditorium.museumId}</small>
    </td>
  </tr>
                    
                      })
                    }
 
    render(){
     
      return (
        <div>
        <section>
        <h3>Filtiraj sale</h3>
               <form action="" onSubmit={this.filterAuditoriums}>
                  <input type="text" placeholder='Naziv sale' value={this.state.auditoriumFilter} onChange={e => this.setState({auditoriumFilter: e.target.value})} />
                  <Button type='submit'>Pretraga</Button>
               </form>
        </section>

        <section>
               <Button variant='danger' style={{marginTop: '1rem'}} onClick={window.print}>Štampaj</Button>
             </section>
        
        <Table>
        <thead>
          <tr>
            <td>Slika</td>
            <td>Naziv</td>
            <td>Opis</td>
            <td>Id muzeja</td>
          </tr>
          </thead>
          <tbody>
          {this.showAuditoriums()}
          </tbody>
        </Table>
        </div>
  
      );
  }
}

export default AllAuditoriums;