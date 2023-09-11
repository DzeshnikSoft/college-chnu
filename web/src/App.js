import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Route, Routes } from 'react-router';
import MainPage from './components/MainPage/mainPage';
import Header from './components/Shared/Header/Header';
import Footer from './components/Shared/Footer/Footer';
import AdminPanel from './components/AdminPanel/AdminPanel';
import React from 'react';
import AuthAdmin from './components/AdminPanel/AuthAdmin';
import EditNewsItem from './components/AdminPanel/components/newsAdmin/EditNewsItem';
import PagesEditor from './components/AdminPanel/SharedForAdmin/Editor';
import PageEditor from './components/AdminPanel/components/pagesEditor/PageEditor';
import Page from './components/Shared/UniversalPage/Page';
import History from './components/HistoryPage/History';

import LinksOther from './components/Shared/LinksOther/LinksOther';
import AllNews from './components/NewsPage/AllNews';

import AdministrationPage from './components/Administration/AdministrationPage';
import StudParlament from './components/StudParlament/StudParlament';
import PersonEditor from './components/AdminPanel/components/personEditor/personEditor';
import PersonCreate from './components/AdminPanel/components/personEditor/personCreate';
import NotFoundComponent from './components/NotFoundPage/NotFoundComponent';
import CreateStudParlament from './components/AdminPanel/components/StudParlament/createStudParlament';
import SingleNews from './components/NewsPage/SingleNews';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Header/>
      <div className="main-block">
        <Routes>
          
            <Route path ="/" exact element = {<React.Fragment><MainPage/><LinksOther/></React.Fragment>}/>
            <Route path ="/admin" exact element = {<React.Fragment><AdminPanel/></React.Fragment>}/>
            <Route path ="/admin/newsEdit/:id" exact element = {<React.Fragment><EditNewsItem/></React.Fragment>}/>
            <Route path = "/admin/createNewPage/:section" exact element = {<React.Fragment><PageEditor/></React.Fragment>}/>
            <Route path = "/admin/editPage/:section/:id" exact element ={<React.Fragment><PageEditor/></React.Fragment>}/>
            <Route path = "/:section/:id" exact element ={<React.Fragment><Page/></React.Fragment>}/>
            <Route path ="/history" exact element = {<History />}/>

            <Route path ="/allnews" exact element = {<React.Fragment><AllNews/></React.Fragment>}/>
            <Route path = "/news/:id" exact element = {<React.Fragment><SingleNews/></React.Fragment>}/>
            <Route path ="/administration" exact element = {<AdministrationPage />}/>
            <Route path = '/studParlament' exact element =  {<StudParlament />} />
            <Route path = "/admin/editPerson/:id" exact element = {<React.Fragment><PersonEditor/></React.Fragment>}/>
            <Route path = "/admin/createPerson" exact element = {<React.Fragment><PersonCreate/></React.Fragment>}/>
            <Route path='*' exact element = {<React.Fragment><NotFoundComponent/></React.Fragment>} />
            <Route path = '/admin/auth' exact element = {<React.Fragment><AuthAdmin/></React.Fragment>}/>
            <Route path = '/admin/createNewPersonStudParlament' exact element = {<React.Fragment><CreateStudParlament isCreate = {true}/></React.Fragment>}/>
        
         
           </Routes> 
           </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
