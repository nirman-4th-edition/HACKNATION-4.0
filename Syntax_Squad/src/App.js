import './App.css';
import Footer from './Footer.js'
import Card from './card-ui'
import Navbar from './Navbar.js';
import Agra from './Agra/Agra1.js';
import Pune from './Pune/Pune1.js';
import NewDelhi from './NewDelhi/Delhi1.js';
import Kolkata from './Kolkata/Kolkata1';
import Hyderabad from './Hyderabad/Hyderabad1';
import Jaipur from './Jaipur/Jaipur1';

import TicketTaj from './Agra/Ticket_Taj.js';
import TicketFathepur from './Agra/Ticket_Fathepur.js';
import TicketAgraFort from './Agra/Ticket_Fort.js';

import Agakhan from './Pune/Ticket_AgaKhan.js';
import Kelkar from './Pune/Ticket_Kelkar.js';
import Shaniwar from './Pune/Ticket_ShaniwarWada.js';

import HumayunsTomb from './NewDelhi/Ticket_Humayun.js';
import QutubMinar from './NewDelhi/Ticket_QurubMinar.js';
import RedFort from './NewDelhi/Ticket_RedFort.js';

import IndianMuseum from './Kolkata/Ticket_IndianMuseum.js';
import thakurBari  from './Kolkata/Ticket_jorasanko.js';
import victoriaMemorial from './Kolkata/Ticket_VictorianMuseum.js';

import  AmberPalace from './Jaipur/Ticket_AmberPalace.js';
import  HawaMahal  from './Jaipur/Ticket_HawaMahal.js';
import jantarMantar from './Jaipur/Ticket_Jantarmantar.js';

import  Palace from './Hyderabad/Ticket_Chowmahalla.js';
import  Golgonda  from './Hyderabad/Ticket_Golconda.js';
import FaluknumaPalace from './Hyderabad/Ticket_Falaknuma.js';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './Home.js';
import Route from 'react-router-dom/Route';
import { BrowserRouter as Router,Switch} from "react-router-dom";
import Admin from './AdminLogin.js'


function App() {
  return (
  <div className="App">
     <Navbar/>
     <Router basename='/react'>
     <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/card" component={Card}/>
        <Route exact path="/footer" component={Footer}/>
        <Route exact path="/navbar" component={Navbar}/>
        
        <Route exact path="/Agra" component={Agra}/>
        <Route exact path="/ticketTaj" component={TicketTaj}/>
        <Route exact path="/fatepursikri" component={TicketFathepur}/>
        <Route exact path="/agrafort" component={TicketAgraFort}/>

        <Route exact path="/Pune" component={Pune}/>
        <Route exact path="/ticketAgakhan" component={Agakhan}/>
        <Route exact path="/ticketKelkar" component={Kelkar}/>
        <Route exact path="/Shaniwar" component={Shaniwar}/>

        <Route exact path="/NewDelhi" component={NewDelhi}/>
        <Route exact path="/HumayunTomb" component={HumayunsTomb}/>
        <Route exact path="/QutubMinar" component={QutubMinar}/>
        <Route exact path="/Redfort" component={RedFort}/>

        <Route exact path="/Kolkata" component={Kolkata}/>
        <Route exact path="/indianmuseum" component={IndianMuseum}/>
        <Route exact path="/victoriameuseum" component={victoriaMemorial}/>
        <Route exact path="/Jorasanko" component={thakurBari}/>

        <Route exact path="/Hyderabad" component={Hyderabad}/>
        <Route exact path="/HumayunTomb" component={HumayunsTomb}/>
        <Route exact path="/QutubMinar" component={QutubMinar}/>
        <Route exact path="/Redfort" component={RedFort}/>

        <Route exact path="/Jaipur" component={Jaipur}/>
        <Route exact path="/AmberPalace" component={AmberPalace}/>
        <Route exact path="/hawamahal" component={HawaMahal}/>
        <Route exact path="/jantarmantar" component={jantarMantar}/>

        <Route exact path="/Jaipur" component={Jaipur}/>
        <Route exact path="/chowmahalla" component={Palace}/>
        <Route exact path="/Golconda" component={Golgonda}/>
        <Route exact path="/falaknuma" component={FaluknumaPalace}/>


        <Route exact path="/admin" component={Admin}/>
      
        
        </Switch>
        </Router>
        <Footer/>
    </div>
);
}

export default App;
