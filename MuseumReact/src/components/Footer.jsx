import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {  
        };    
    }  
    render(){
        return (
            <div className="site-footer">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h6>Zanimljivosti</h6>
                    <p className="text-justify">Unutar zbirki pet odeljenja Muzeja smešteno je preko 33.000 muzejskih predmeta a pomenućemo samo nekoliko najznačajnijih zbirki: zbirka hladnog i vatrenog oružja, zbirka kapa zlatara, likovna zbirka sa značajnim fondom slika iz XVIII i XIX veka, zbirka nakita iz praistorije i srednjeg veka, zbirka ptica. Muzej ima i Pedagoško-informativnu službu, Dokumentacioni centar, restauratorsku i konzervatorsku radionicu, fotografsko odeljenje kao i stolarsku radionicu. U Muzeju postoji i stručna biblioteka sa preko 5.000 naslova.</p>
                  </div>
        
                  <div className="col-sm-6 col-md-6">
                    <h6>Kategorije sajta</h6>
                    <ul className="footer-links">
                      <li><a href="/museums">Muzeji</a></li>
                      <li><a href="/auditoriums">Izlozbene sale</a></li>
                      <li><a href="/exhibitions">Izlozbe</a></li>
                    </ul>
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">Copyright &copy; 2021 Sva prava zadrzana
                    </p>
                  </div>
                </div>
                </div>
            </div>
        );
    }
}
export default Footer;