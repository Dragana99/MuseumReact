import React, { Component } from 'react';

import '../App.css';
import image1 from '../resource/izlozba.jpg';
import image2 from '../resource/museum.jpg'
import image3 from '../resource/eksponat.jpg';
import image4 from '../resource/statue.jpg';
import image6 from '../resource/palata_muzeja.jpg';

class HomePage extends Component {
  
    render(){

      return (
       <div className="accordion-homepage">
   
         <div className= "accordion-homepage--row">
          <img src = {image2} width="100%" height="800"/>    
        </div>

        <div className="heading">Muzeji Srbije - Mesto na kome ćete, bez obzira gde se nalazite, uvek imati priliku da, putem interaktivne virtuelne ture pogledate aktuelne  i sve oneizložbe koje niste imali priliku da posetite.</div>
          <div className="text-home"> <br></br>
          Muzej je sociokulturna ustanova u kojoj se sakupljaju, 
          proučavaju i čuvaju spomenici umetnosti, istorije, nauke, tehnologije i drugih oblasti ljudske delatnosti. 
          Pored toga, ova institucija se bavi obrazovnim aktivnostima, izlaže eksponate javnosti, a muzej polazi od privatnih kolekcija 
          umetničkih predmeta, artefakata i retkosti.Ali uvek su sve ove zbirke odražavale prioritet kulturnog interesa određenog doba. 
          Na primer, u stara vremena to su uglavnom bila umetnička dela. U srednjem veku se više pažnje posvećivalo ikonama, crkvenim priborom, 
          umetničkom šivanju, mošti svetaca itd. <br></br> <br></br> Prvi muzeji koji su sebi postavili naučne ciljeve pojavili su se u Evropi tokom renesanse. 
          Počeli su da sakupljaju minerale, astronomske instrumente, etnografske predmete i još mnogo toga. U Rusiji, Kunstkamera je postala prvi 
          muzej dostupan za posete javnosti. Osnova njene zbirke bila je zbirka Petra I: oružje različitih naroda, slike, grafike, alatne mašine, 
          itd.  <br></br> <br></br> Svi muzeji se mogu podeliti na: istraživački i obrazovni, prirodni naučni, istorijski, književni, umetnički, tehnički, obrazovni 
          i istraživački. <br></br> <br></br> Osnova takve podele je profilna orijentacija ustanove i njena pripadnost određenom području ljudske aktivnosti. 
          Kao i svaki drugi sociokulturni institut, muzej ima svoje funkcije: - dokumentacija: refleksija, kroz izložbe, različite faktore, 
          događaje koji su se odvijali u društvu; - obrazovanje i vaspitanje: upoznavanje posetilaca sa istorijskim trenucima, formiranje 
          estetskog ukusa; - slobodno vreme: držanje atraktivni oblici izleta za posetioce, rekreacija enterijera, upotreba pozorišnih oblika rada,
           koncerata, balova, proslava, itd. Stepen razvoja i produkcije muzeja j slučaj govori o opštem kulturnom nivou naroda i kako stanovništvo
            zemlje pripada prošlosti, skuplji i ponosan.</div>

          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column">    
          <img className="image-left-padding" src = {image6} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column right-text">   
         <p> Cilj nam je da virtuelnim obilascima, približimo galerije i muzeje domaćoj i stranoj publici, doprinesemo očuvanju i promovisanju kulturnog nasleđa i omogućimo  predstavljanje savremene umetnosti i drugih kulturno-umetničkih projekata široj publici.</p>
          </div>
          </div>


          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column left-text">   
          <div> 
          <p>Ova najstarija muzejska ustanova osnovana je 1844. godine na inicijativu srpskog književnika Jovana Sterije Popovića, od 1952. godine nalazi se u sadašnjem zdanju sagrađenom 1903. godine, po projektu arhitekata Nikole Nestorovića i Andre Stevanovića. </p></div>
          </div>
          <div className = "accordion-homepage--column">  
           <img className="image-right-padding" src = {image2} width = "100%"/>
          </div>
          </div>


          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column">    
          <img className="image-left-padding" src = {image3} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column  right-text">   
         <p>“U Muzeju se čuvaju praistorijske i klasične arheološke kolekcije, kolekcije vezane za srednjovekovnu kulturu i umetnost, kolekcije slikara od 18. do 20. veka, kolekcija inostranih umetničkih dela i bogato numizmatičko odeljenje.” </p>
          </div>
          </div>

          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column  left-text">   
          <div>  
          <p>U našoj prestonici postoji 39 umetničkih, kulturno-istorijskih, memorijalnih, tehničkih i prirodno-istorijskih muzeja čije interesantne postavke, bogate riznice i veliki broj reprezentativnih predmeta govore o najrazličitijim periodima naše zemlje. Muzeji u Beogradu čuvaju kulturno i naučno blago koje predstavlja svedočanstvo o tome kako je grad nastajao, u kom vremenu i u kakvim prilikama se razvijao.
</p></div>
          </div>
          <div className = "accordion-homepage--column">   
       
<img className="image-right-padding" src = {image1} width = "100%"/>
          </div>
          </div>


          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column">    
          <img className="image-left-padding" src = {image2} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column right-text">   
         <p>Koreni nastanka muzeja u Beogradu, nalaze se u osnivanju Narodnog muzeja, ukazom ministra prosvete Jovana Sterije Popovića, 1844. godine. Tada je prvi put realizovana ideja o prikupljanju, čuvanju i prikazivanju muzejske građe kojom će se ilustrovati istorija srpskog naroda. Iz njegovog fonda su kasnije osnovani svi veći beogradski muzeji.</p>
          </div>
          </div> 

          <div className="heading">Od 2005. godine, u muzejima u Beogradu se organizuje manifestacija „Noć muzeja“, kada se po ceni jedne karte može posetiti veliki broj muzeja, galerija i drugih kulturnih institucija.
</div>
          <div className="text-home"><br></br>Pokazivanjem indeksa ili studentske kartice, studenti mogu ostvariti popuste u Etnografskom muzeju, Istorijskom muzeju, Muzeju nauke i tehnike, Muzeju Nikole Tesle, Muzeju primenjene umetnosti, Muzeju grada Beograda, dok je ulaz u Prirodnjački muzej i Muzej afričke umetnosti za studente besplatan.<b> Ponedeljak je neradan dan za sve muzeje.</b></div>

        <div className= "accordion-homepage--row">
          <div className = "accordion-homepage--column">    
          <img src = {image1} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column">   <img src = {image4} width = "100%"/></div>
          </div>
          <div className = "pre-footer"></div>
        
         </div>
      
      );
  }
}

export default HomePage;