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
}

// Redux model
/*
Example
{
  loading: Boolean
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
});

const poster = {
  folder: "poster",
  names: ["no_nos_vamos","desnudo","corazon","lilian","valientes"],
  extension: "jpg",
  resolutions:[
    {
      name: "original",
      link: "Original Size (PDF)",
      extension: "pdf"
    }
  ],
  folders:{
    display: "display",
    original: "original"
  }
}

//React classes
const App = React.createClass({
  render: function() {
    return (
      <div id="inner-content">
        <h1>#VALIENTES</h1>
        <Posters/>
      </div>
    )
  }
});

const Posters = React.createClass({
  render: function() {
    var displayDivs = [];
    for (var i=0; i<poster.names.length; i+=1) {
      var name = poster.names[i];
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
          <a href={poster.folder + "/" + resFolder + "/" + name + "." + resExtension} key={"link-" + i + "-" + j}>{resLinkTitle}</a>
        );
      }
      displayDivs.push(
        <div className="poster-container" key={i}>
          <div className="poster-bg" id={"poster-bg-" + (i+1)}/>
          <img src={file}/>
          <div className="poster-links">{links}</div>
        </div>
      );
    }
    return (
      <div>
        {displayDivs}
      </div>
    )
  }
});

//React / Redux connection and render
const store = createStore(app);
const VisibleApp = connect(mapStateToProps,mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store={store}><VisibleApp /></Provider>,
  document.getElementById('content')
);
