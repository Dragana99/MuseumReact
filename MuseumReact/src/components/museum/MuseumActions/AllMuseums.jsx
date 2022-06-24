import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import { Container, Card, CardGroup, Button, Table} from 'react-bootstrap';
import { isLoggedIn } from '../../auth/utils';


class AllMuseums extends Component {
    constructor(props) {
      super(props);
      this.state = {
        museums: [],
        filteredMuseums: [],
        redirect: false,
        museumFilter: '',
      };
      this.removeMuseum = this.removeMuseum.bind(this);
      this.editMuseum = this.editMuseum.bind(this);
      this.filterMuseums = this.filterMuseums.bind(this)
    }

    componentDidMount() {
      this.getMuseums();
   }

   editMuseum(id){
    this.props.history.push(`editmuseum/${id}`);

  }

  filterMuseums(e) {
    e.preventDefault();
    const filteredMuseums = this.state.museums.filter(museum => museum.name.toLowerCase().includes(this.state.museumFilter.toLowerCase()));
    this.setState({filteredMuseums});
  };

    removeMuseum(id) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
       
    };

   

    fetch(`${serviceConfig.baseURL}/api/Museums/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(result => {
            NotificationManager.success("Uspesno obrisan muzej ciji je ID: "+ id);
            const newState = this.state.museums.filter(museum => {
                return museum.id !== id;
            })
            window.location.reload();
        })
        .catch(response => {
            NotificationManager.error("Nije moguce obrisati muzej");
            this.setState({ submitted: false });
        });
    }

    getMuseums() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      };

      fetch(`${serviceConfig.baseURL}/api/Museums`, requestOptions)
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
              museums: data,
              filteredMuseums: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error("Proverite konkeciju! Nije moguće prikupiti podatke!");
            this.setState({ submitted: false });
        });
    }

    showMuseums() {
      return this.state.filteredMuseums.map(museum => {
          return <tr key={museum.id} className="card-content">
            <td>
    <Card.Img variant="top" src="http://www.fashionela.net/wp-content/uploads/2014/12/Louvre-Museum-5.jpg" height="500"/>
    </td>
      <td>{museum.name}</td>
      <td>{museum.address}, {museum.city}</td>
     <td>{museum.email}</td>
      <td>{museum.phone}</td>
      <td><small className="text-muted">{museum.id}</small></td>
      <br></br>
 
 <td><Button disabled={!isLoggedIn()} variant="dark"  width = "1%" className="text-center cursor-pointer btn-style" 
 onClick={() => this.editMuseum(museum.id)} > Izmeni muzej</Button></td>

<td><Button disabled={!isLoggedIn()} variant="dark"  width = "1%" className="text-center cursor-pointer btn-style" onClick={() => this.removeMuseum(museum.id)} > Obrisi muzej</Button></td> 
  </tr>
                    
                      })
                    }
 
    render(){
      return (

        <div>
             <section>
               <h3>Filtiraj muzeje</h3>
               <form action="" onSubmit={this.filterMuseums}>
                  <input type="text" placeholder='Naziv muzeja' value={this.state.museumFilter} onChange={e => this.setState({museumFilter: e.target.value})} />
                  <Button type='submit'>Pretraga</Button>
               </form>
             </section>

             <section>
               <Button style={{marginTop: '1rem'}} onClick={window.print}>Štampaj</Button>
             </section>
        
                  <Table>
                    <thead>
                      <tr>
                      <td>Slika</td>
                      <td>Naziv</td>
                      <td>Adresa</td>
                      <td>Email</td>
                      <td>Telefon</td>
                      <td>ID muzeja</td>
                      <td style={{textAlign: "center"}} colSpan={4}>Akcija</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.showMuseums()}
                    </tbody>
                  </Table> 
                  </div>  
  
      );
  }
}

export default AllMuseums;