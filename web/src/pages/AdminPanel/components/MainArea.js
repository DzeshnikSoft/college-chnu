import React from 'react'
import './mainArea.css'
import NewsAdmin from './newsAdmin/NewsAdmin';
import PagesList from '../components/pagesEditor/pagesList'
import AdministrationAdmin from './AdministrationAdmin.js/AdministrationAdmin';
import StudParlament from './StudParlament/studParlament';

const MainArea = ({menuState}) => {
  return (
    <div className ="mainArea">
      <div className="adminContainer">
        {(function (){
          switch(menuState){
            case 0 : return <p>{menuState}</p>
            case 1 : return <AdministrationAdmin/>;
            case 2 : return <PagesList section ={"speciality"}/>;
            case 3 : return <PagesList section ={"student"}/>;
            case 4 : return <PagesList section ={"entrant"}/>;
            case 5 : return <StudParlament/>;
            case 6 : return <PagesList section ={"omo"}/>;
            case 7 : return <NewsAdmin/>;
            default :
              return (<h1 style = {{textAlign:"center"}}>Виберіть елемент який хочете редагувати!</h1>);
          }})()
        }
      </div>

    </div>
  )
}

export default MainArea