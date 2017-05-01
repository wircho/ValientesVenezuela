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
  names: ["corazon","desnudo","lilian","no_nos_vamos","valientes"],
  extension: "jpg",
  resolutions:["original"],
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
    var displayFiles = poster.names.map(function(name) { return poster.folder + "/" + poster.folders.display + "/" + name + "." + poster.extension });
    var displayDivs = [];
    for (var i=0; i<displayFiles.length; i+=1) {
      var file = displayFiles[i];
      displayDivs.push(
        <div className="poster-container" key={i}>
          <div className="poster-bg" id={"poster-bg-" + (i+1)}/>
          <img src={file}/>
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
