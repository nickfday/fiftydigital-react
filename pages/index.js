import Link from "next/link";
import axios from "axios";
import Loader from "react-loader";
import MediaQuery from "react-responsive";
import Media from "react-media";
import Slider from "react-slick";
import "../style/style.scss";
//import "matchmedia-polyfill";
import { Navbar, Nav } from "react-bootstrap";
import Head from "next/head";

const socialData = [
  {
    image: "/static/images/MENUFB_Off.png",
    imageHover: "/static/images/MENUFB_Hover.png",
    url: "https://www.facebook.com/fiftydigital/?ref=bookmarks",
    alt: "facebook icon"
  },
  {
    image: "/static/images/MENUTwitter_Off.png",
    imageHover: "/static/images/MENUTwitter_Hover.png",
    url: "https://twitter.com/FiftyDigital",
    alt: "facebook icon"
  },
  {
    image: "/static/images/MENUInsta_Off.png",
    imageHover: "/static/images/MENUInsta_Hover.png",
    url: "https://www.instagram.com/fiftydigital",
    alt: "facebook icon"
  },
  {
    image: "/static/images/MENULinkedin_Off.png",
    imageHover: "/static/images/MENULinkedin_Hover.png",
    url: "https://www.linkedin.com/company/fifty-digital",
    alt: "facebook icon"
  }
];

const Social = props => {
  const items = props.data.map(function(item, index) {
    return (
      <div className="social-item" key={index}>
        <a href={item.url} target="_blank">
          <img
            src={item.image}
            onMouseEnter={e => (e.currentTarget.src = item.imageHover)}
            onMouseLeave={e => (e.currentTarget.src = item.image)}
          />
        </a>
      </div>
    );
  });

  return <div className="social-list">{items}</div>;
};

class Logos extends React.Component {
  render() {
    const logos = [
      "/static/images/Fifty_Nav.png",
      "/static/images/FiftyI_Nav.png",
      "/static/images/FiftyE_Nav.png"
    ];
    const rollover = [
      "/static/images/Fifty_Nav_Hover.png",
      "/static/images/FiftyI_Nav_Hover.png",
      "/static/images/FiftyE_Nav_Hover.png"
    ];

    const logo = this.props.logos.map(function(logo, index) {
      return (
        <a href={`/${logo.site_url}`} key={index}>
          {" "}
          <div className="navbar-logo">
            <img
              src={logos[index]}
              onMouseEnter={e => (e.currentTarget.src = rollover[index])}
              onMouseLeave={e => (e.currentTarget.src = logos[index])}
            />
          </div>
        </a>
      );
    });
    return <div className="navbar-logos">{logo}</div>;
  }
}

const Header = props => {
  if (props.videos && props.videos[0] && props.videos[0].acf) {
    return (
      <div>
        <Head>
          <title>
            Fifty Digital - Digital and Social Media Agency in Sponsorship and
            Sport
          </title>
          <link
            rel="shortcut icon"
            href="/wp-content/themes/fiftydigital/favicon.ico"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Navbar expand="xl" variant="dark">
          <Navbar.Brand>
            <div className="text">
              We're a digital and social media agency specialising in{" "}
              <span>sponsorship</span> and <span>sport.</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="hidden-sm-up"
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=" navbar-toggleable-xs"
          >
            <Nav className="mr-auto">
              <Logos logos={Object.values(props.videos[0].acf)} />
            </Nav>
          </Navbar.Collapse>
          <Social data={Object.values(socialData)} />
          {/* <div className="social d-sm-none d-md-block">Social</div> */}
        </Navbar>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const Slide = props => {
  //console.log(props);

  return (
    <div className="fifty-slide">
      <a href={props.video.site_url}>
        <video muted autoPlay loop playsInline>
          <source src={props.video.video.url} />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div>
          <img src={props.video.image.url} />
        </div>
      </a>
    </div>
  );
};

class FiftySlider extends React.Component {
  // componentDidUpdate() {
  //   this.slider.slickGoTo(this.props.selectedVideo);
  // }

  render() {
    const settings = {
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      className: "fifty-slider",
      dots: true,
      infinite: true,
      speed: 500,
      //afterChange: this.props.handleSelectedVideo,
      pauseOnHover: false,
      pauseOnFocus: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <Slider ref={slider => (this.slider = slider)} {...settings}>
        {Object.values(this.props.videos[0].acf).map((video, index) => (
          <Slide
            video={video}
            index={index}
            key={index}
            selectedVideo={this.props.selectedVideo}
            handleSelectedVideo={this.props.handleSelectedVideo}
          />
        ))}
      </Slider>
    );
  }
}

const FiftyLogos = props => {
  return Object.values(props.videos[0].acf).map((video, index) => {
    return (
      <div
        className={`splash-logo splash-logo-${index}`}
        onClick={() => props.handleSelectedVideo(index)}
      >
        <img src={video.image.url} /> {video.index}
      </div>
    );
  });
};

class VideoWrapper extends React.Component {
  render() {
    return (
      <div>
        <div className="fifty-background">
          <FiftySlider
            videos={this.props.videos}
            // key={index}
            // index={index}
            selectedVideo={this.props.selectedVideo}
            handleSelectedVideo={this.props.handleSelectedVideo}
          />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      loaded: false,
      selectedVideo: 0,
      handleSelectedVideo: props.handleSelectedVideo
    };
    this.handleSelectedVideo = this.handleSelectedVideo.bind(this);
  }

  handleSelectedVideo(video) {
    this.setState({
      selectedVideo: video
    });
  }

  fetchVideos() {
    const self = this;
    let baseUrl;
    try {
      baseUrl = site.base_url;
    } catch (e) {
      baseUrl = "http://fiftydigital.finley-day.com";
    }

    const request = axios(baseUrl + "/wp-json/acf/v3/splashvideos").then(
      function(response) {
        self.setState({
          exercises: response.data,
          loaded: true
        });
      }
    );
  }

  componentDidMount() {
    this.fetchVideos();
  }

  render() {
    return (
      <div className="app">
        <link
          rel="stylesheet"
          //href="../node_modules/bootstrap/dist/css/bootstrap.min.css"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"
        />

        <Header videos={this.state.exercises} />
        {this.state.loaded ? (
          <VideoWrapper
            videos={this.state.exercises}
            selectedVideo={this.state.selectedVideo}
            handleSelectedVideo={this.handleSelectedVideo}
          />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default App;
