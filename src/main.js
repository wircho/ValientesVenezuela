import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Immutable from 'immutable';
var classNames = require('classnames');
import $ from 'jquery';
import 'jquery-form';
import {
//Utilities
  pad,
  def,
  fallback,
  nullFallback,
  err,
  errstr,
  errdict,
  geterr,
  projf,
  projff,
//Object utilities
  mutate,
  remove,
  rotate,
  defaults
} from 'wircho-utilities';

const ACTIONS = {
  //START_LOADING:"START_LOADING", // No params
  SHOW_POSTER: "SHOW_POSTER", // PARAM: name
  HIDE_POSTER: "HIDE_POSTER"
}

// Redux model
/*
{
  full_screen_name: String
}
*/

// Actions creators
//const startLoading = ()=>({type:ACTIONS.START_LOADING});

// Reducer
const initialState = {};
function app(state,action) {
  if (!def(state)) {
    return initialState
  }
  switch (action.type) {
    case ACTIONS.SHOW_POSTER:
      return mutate(state,{full_screen_name: action.name});
    case ACTIONS.HIDE_POSTER:
      return remove(state,"full_screen_name");
    // case ACTIONS.START_LOADING:
    //   return mutate(state,{loading:true});
    //   break;
    default:;
  }
}

// Map state to props
const mapStateToProps = state=>state;

const mapDispatchToProps = (dispatch) => ({
  // uploadImage: (file) => {
  //   dispatch(startLoading());
  //   uploadFileData(file).then(function(json) {
  //     getImageInfo(json.url).then(function(json) {
  //       dispatch(setInfo(json));
  //     },function(error) {
  //       alert("Something went wrong while processing image: " + errstr(error));
  //       dispatch(setInfo());
  //     });
  //   },function(error) {
  //     alert("Something went wrong while uploading image: " + errstr(error));
  //     dispatch(setInfo());
  //   });
  // }
  clickedPoster: (event,name) => {
    event.preventDefault();
    dispatch({type: ACTIONS.SHOW_POSTER, name});
  },
  closePoster: (event) => {
    event.preventDefault();
    dispatch({type: ACTIONS.HIDE_POSTER, name});
  }
});

const poster = {
  folder: "poster",
  names: ["no_nos_vamos","desnudo","corazon","lilian","valientes"],
  extension: "jpg",
  resolutions:[
    {
      name: "original",
      link: "Afiche 46 X 61cm (PDF)",
      extension: "pdf"
    }
  ],
  folders:{
    display: "display",
    original: "original",
    large: "large"
  }
}

//React classes
const App = React.createClass({
  render: function() {
    return (
      <div id="inner-content">
        <div id="scrollable-content">
          <h1>#VALIENTES</h1>
          <p>Una colecci&#243;n de afiches inspirados en los h&#233;roes venezolanos 
          <br/> que salen a luchar todos los d&#237;as por un cambio en nuestro pa&#237;s. 
          <br/> Todos <a> #VALIENTES </a> <br/> <br/> 
           Descarga todos los afiches gratis, listos para imprimir.</p><br/><br/>
          <Posters clickedPoster={this.props.clickedPoster}/>
        </div>
        <FullScreen closePoster={this.props.closePoster} name={this.props.full_screen_name}/>
        <div id="header">
          <div id="twitter">
              <a href="https://twitter.com/ValientesVzla" target="_blank"><img src={'twitter.svg'}/></a>
          </div>
          <div id="instagram">
              <a href="https://www.instagram.com/valientesvzla/" target="_blank"><img src={'insta.svg'}/></a>
          </div>
        </div>
        <div id="instructions">
          <div id="idea">
              <img src={'idea.svg'}/>
              <br/>&iquest;Quieres mandar tu dise&ntilde;o?
          </div>
          <div id="plantilla">
              <a href=""><img src={'plantilla.svg'}/></a>
              <br/>Baja la plantilla
          </div>
          <div id="email">
              <a href="mailto:info@helpvzla.org"><img src={'email.svg'}/></a>
              <br/>Env&iacute;ala por correo
          </div>
        </div>
      </div>
    )
  }
});

const Posters = React.createClass({
  render: function() {
    var displayDivs = [];
    for (var i=0; i<poster.names.length; i+=1) {
      const name = (" " + poster.names[i]).slice(1);
      console.log("name:" + name);
      var file = poster.folder + "/" + poster.folders.display + "/" + name + "." + poster.extension;
      var links = [];
      for (var j=0; j<poster.resolutions.length; j+=1) {
        var res = poster.resolutions[j];
        var resName = res.name;
        var resLinkTitle = res.link;
        var resExtension = res.extension;
        var resFolder = poster.folders[resName];
        links.push(
          <a href={poster.folder + "/" + resFolder + "/" + name + "." + resExtension} key={"link-" + i + "-" + j} download="download" target="_blank"><div className="dl-icon"/>{resLinkTitle}</a>
        );
      }
      console.log("name(0): " + name);
      var clickedPoster = function(event) {
        console.log("name(1): " + name);
        this.props.clickedPoster(event,name);
      }.bind(this);
      displayDivs.push(
        <div className="poster-and-links-container" key={i}>
          <div className="poster-container" onClick={clickedPoster}>
            <img src={file}/>
          </div>
          <div className="poster-links">{links}</div>
        </div>
      );
    }
    return (
      <div id="all-posters">
        {displayDivs}
      </div>
    )
  }
});

const FullScreen = React.createClass({
  render: function() {
    if (this.props.name) {
      var file = poster.folder + "/" + poster.folders.large + "/" + this.props.name + "." + poster.extension;
      var res = poster.resolutions[0]; // Original
      var resName = res.name;
      var resLinkTitle = res.link;
      var resExtension = res.extension;
      var resFolder = poster.folders[resName];
      var resLink = poster.folder + "/" + resFolder + "/" + this.props.name + "." + resExtension;
      return (<div id="full-screen">
        <div id="full-screen-x" onClick={this.props.closePoster}><img src="x.svg"/></div>
        <div id="full-screen-dl"><a href={resLink} download="download" target="_blank"><img src="download.svg"/></a></div>
        <div id="full-screen-poster"><img src={file}/></div>
      </div>);
    } else {
      return <div className="hidden"/>
    }
  }
});

//React / Redux connection and render
const store = createStore(app);
const VisibleApp = connect(mapStateToProps,mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store={store}><VisibleApp /></Provider>,
  document.getElementById('content')
);
