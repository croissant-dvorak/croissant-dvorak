
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      currentVideo: null
    };
  }

  componentDidMount() {
    this.getYouTubeVideos('react tutorials');
  }

  getYouTubeVideos(query) {
    var options = {
      key: this.props.API_KEY,
      query: query
    };

    this.props.searchYouTube(options, (videos) =>
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      })
    );
  }

  handleVideoListEntryTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  render() {
    return (
      <div>
        <Nav
          handleSearchInputChange={this.getYouTubeVideos.bind(this)}
        />
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
        {/*
          * It's very important to bind the context of this callback.
          * Also acceptable is to pass a anonymous functoin expression with a fat
          * arrow that inherits the surrounding lexical `this` context:
          *
          *   handleVideoListEntryTitleClick={(video) => this.onVideoListEntryClick(video)}
          *                                  - or -
          *   handleVideoListEntryTitleClick={(currentVideo) => this.setState({currentVideo})}
          *
          */}
          <VideoList
            handleVideoListEntryTitleClick={this.handleVideoListEntryTitleClick.bind(this)}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
