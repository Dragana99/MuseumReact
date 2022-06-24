import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from "../../../appSettings";
import { Container, Card, CardGroup, Button} from 'react-bootstrap';
import { isLoggedIn } from '../../auth/utils';

class AllExhibits extends Component {
    constructor(props) {
      super(props);
      this.state = {
        exhibits: []
      };
    }

    componentDidMount() {
       this.getExhibits();
    }

    editExhibit(id){
      this.props.history.push(`editexhibit/${id}`);
  
    }
  
      removeExhibit(id) {
        const requestOptions = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
         
      };
  
      fetch(`${serviceConfig.baseURL}/api/Exhabit/${id}`, requestOptions)
          .then(response => {
              if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.statusText;
          })
          .then(result => {
              NotificationManager.success("Uspesno obrisan eksponat!");
              const newState = this.state.exhibits.filter(exhibit => {
                  return exhibit.id !== id;
              })
              window.location.reload();
          })
          .catch(response => {
              NotificationManager.error("Nije moguce obrisati eksponat!");
              this.setState({ submitted: false });
          });
      }

    getExhibits() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      };

      fetch(`${serviceConfig.baseURL}/api/Exhabit`, requestOptions)
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
                exhibits: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error("Proverite konkeciju! Nije moguće prikupiti podatke!");
            this.setState({ submitted: false });
        });
    }

    getAllExhibits() {
      return this.state.exhibits.map(exhibit => {
          return <div key={exhibit.name}><Card className="bg-dark text-white adding-padding">
          <Card.Img src={exhibit.picture} />
          <Card.ImgOverlay>
            <Card.Title>{exhibit.name}</Card.Title>
            <Card.Text>
              Eksponat je iz {exhibit.year}. godine.
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
        <Button disabled={!isLoggedIn()} variant="dark"  width = "1%" className="text-center cursor-pointer btn-style-2" 
 onClick={() => this.editExhibit(exhibit.id)} > Izmeni eksponat</Button>
      <Button disabled={!isLoggedIn()} variant="dark"  width = "1%" className="text-center cursor-pointer btn-style-2" 
onClick={() => this.removeExhibit(exhibit.id)} > Obrisi eksponat</Button>
</div>
                    
                      })
                    }
 
    render(){
      const exhibitsDetails = this.getAllExhibits();
      const exhibits =<Container className= "container-cards"> {exhibitsDetails} </Container>;
      return (<div>
        <div className="heading" >Eksponati</div><br></br>
                  <CardGroup>
                  {exhibits}
                  </CardGroup> </div>  
  
      );
  }
}

export default AllExhibits;
