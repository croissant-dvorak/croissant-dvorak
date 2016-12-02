import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyC1dMvWxCbuOIJkcR5Pe_3Tk1diibfw5j8';
//youtube api key
//npm install --save youtube-api-search

//new comment
//Create a new component. Should produce some html
class App extends Component {
    constructor(props){
    	super(props)

    	this.state = {
      videos: [],
      selectedVideo: null
    };


    this.videoSearch('surfboard')
    	
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
        videos: videos,
        selectedVideo: videos[0]
            });
            //this.setState({videos}) <-- same thing
        });

    }
    render(){
    return (
    	<div >
        	<SearchBar onSearchTermChange={term => this.videoSearch(term)} />
            <VideoDetail video={this.state.selectedVideo} />
        	<VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos} />
        </div>
      );
    }
}


//Take this component's generated html and put it
//on the page (in the DOM)

ReactDOM.render( < App / > , document.querySelector('.container'));
//html to render, target dom node-container
