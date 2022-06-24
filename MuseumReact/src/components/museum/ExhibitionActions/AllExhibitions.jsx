import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import { Card, Button, Table} from 'react-bootstrap';
import { isLoggedIn } from '../../auth/utils';


class AllExhibitions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        exhibitions: [],
        filteredExhibitions: [],
        redirect: false,
        exhibitionFilter: '',
      };
      this.removeExhibition = this.removeExhibition.bind(this);
      this.editExhibition = this.editExhibition.bind(this);
      this.filterExhibitions = this.filterExhibitions.bind(this)
    }

    componentDidMount() {
      this.getExhibitions();
   }

   editExhibition(id){
    this.props.history.push(`editexhibition/${id}`);

  }

  filterExhibitions(e) {
    e.preventDefault();
    const filteredExhibitions = this.state.exhibitions.filter(exhibition => exhibition.name.toLowerCase().includes(this.state.exhibitionFilter.toLowerCase()));
    this.setState({filteredExhibitions});
  };

    removeExhibition(id) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
       
    };

    fetch(`${serviceConfig.baseURL}/api/Exhibit/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.statusText;
        })
        .then(result => {
            NotificationManager.success("Uspesno obrisana izlozba");
            const newState = this.state.exhibitions.filter(exhibition => {
                return exhibition.id !== id;
            })
            window.location.reload();
        })
        .catch(response => {
            NotificationManager.error("Nije moguce obrisati izlozbu");
            this.setState({ submitted: false });
        });
    }

    getExhibitions() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      };

      fetch(`${serviceConfig.baseURL}/api/Exhibit`, requestOptions)
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
              exhibition: data,
              filteredExhibitions: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error("Proverite konkeciju! Nije moguće prikupiti podatke!");
            this.setState({ submitted: false });
        });
    }

    showExhibitions() {
      return this.state.filteredExhibitions.map(exhibition => {
          return <tr key={exhibition.id} className="card-content">
            <td>
    <Card.Img variant="top" src={exhibition.image} height="450"/>
    </td>
      <td>{exhibition.name}</td>
      <td>{exhibition.description}</td>
     <td>{exhibition.opening}</td>
      <td>{exhibition.auditoriumName}</td>
      <br></br>
 
 <td><Button disabled={!isLoggedIn()} variant="dark"  width = "1%" className="text-center cursor-pointer btn-style" 
 onClick={() => this.editExhibition(exhibition.id)} > Izmeni izlozbu</Button></td>

<td><Button disabled={!isLoggedIn()} variant="dark"  width = "1%" className="text-center cursor-pointer btn-style" onClick={() => this.removeExhibition(exhibition.id)} > Obrisi izlozbu</Button></td> 
  </tr>
                    
                      })
                    }
 
    render(){
      return (

        <div>
             <section>
               <h3>Filtiraj izlozbe</h3>
               <form action="" onSubmit={this.filterExhibitions}>
                  <input type="text" placeholder='Naziv izlozbe' value={this.state.exhibitionFilter} onChange={e => this.setState({exhibitionFilter: e.target.value})} />
                  <Button type='submit'>Pretraga</Button>
               </form>
             </section>

                  <Table>
                    <thead>
                      <tr>
                      <td><b>Slika</b></td>
                      <td><b>Naziv</b></td>
                      <td><b>Opis</b></td>
                      <td><b>Vreme i datum</b></td>
                      <td><b>Izlozbena prostorija</b></td>
                      <td style={{textAlign: "center"}} colSpan={4}><b>Akcija</b></td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.showExhibitions()}
                    </tbody>
                  </Table> 
                  </div>  
  
      );
  }
}

export default AllExhibitions;