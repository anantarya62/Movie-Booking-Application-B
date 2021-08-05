import { Button, CardContent } from '@material-ui/core';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import ReactDOM from 'react-dom';
import Home from '../home/Home';
import { Typography } from "@material-ui/core";
import "./Details.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {},
            starIcons: [{
                id: 1,
                stateId: "star1",
                color: "black"
            },
            {
                id: 2,
                stateId: "star2",
                color: "black"
            },
            {
                id: 3,
                stateId: "star3",
                color: "black"
            },
            {
                id: 4,
                stateId: "star4",
                color: "black"
            },
            {
                id: 5,
                stateId: "star5",
                color: "black"
            }]
        }
    }
    componentWillMount() {
        let currentState = this.state;
        currentState.movie = moviesData.filter((mov) => {
            return mov.id === this.props.movieId
        })[0];
        this.setState({ currentState });
    }
    artistClickHandler = (url) => {
        window.location = url;
    }
    handleClick = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    starClickHandler = (id) => {
        let starIconList = [];
        for (let star of this.state.starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";
            }
            starIconList.push(starNode);
        }
        this.setState({ starIcons: starIconList });
    }
    render() {
        let mov=this.state.movie;
        const opts = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
        return (
            <div>
                <div>
                <Header/>
                <Button variant="contained" color="primary" style={{float:"right", position:"absolute" ,right:133,top:7}}>Book Show</Button>
                </div>
                <div className="back">
                    <Typography onClick={this.handleClick} style={{
                        marginLeft: "24px", 
                        marginTop: "8px",
                        marginBottom: "0px",
                        height: "24px",
                        cursor: "pointer",
                        }}>
                        &#60;Back to Home
                    </Typography>
                </div>
                <div className="row">
                <div className="column1"><img src={mov.poster_url} alt={mov.title}/></div>
                <div className="column2">
                            <Typography variant="headline" component="h2">{mov.title}</Typography>
                            <Typography>
                                <span className="bold">Genres: </span> {mov.genres.join(', ')}
                            </Typography>
                            <Typography>
                                <span className="bold">Duration: </span> {mov.duration}
                            </Typography>
                            <Typography>
                                <span className="bold">Release Date: </span> {new Date(mov.release_date).toDateString()}
                            </Typography> 
                            <Typography>
                                <span className="bold">Rating: </span> {mov.critics_rating}
                            </Typography>
                            <Typography>
                                <span className="bold">Plot: </span> <a href={mov.wiki_url}>(Wiki Link)</a>{mov.storyline}
                            </Typography>
                            <Typography>
                                <span className="bold">Trailer: </span>
                            </Typography>
                            <div className="trailer">
                            <YouTube                              
                                videoId={mov.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}/>
                                </div>
                        
                </div>
                <div className="column3">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {this.state.starIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                onClick={() => this.starClickHandler(star.id)}
                            />
                        ))}
                    <div className="bold marginBottom16 marginTop16">
                        <Typography>
                          <span className="bold">Artists: </span>
                       </Typography>
                    </div>
                    <div>
                        <GridList cellHeight={160} cols={2}>
                        {mov.artists != null && mov.artists.map(artist => (
                                    <GridListTile
                                        className="gridTile"
                                        onClick={() => this.artistClickHandler(artist.wiki_url)}
                                        key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                        </GridList>
                    </div>
                </div>
                </div>
                
            </div>
        );
    }
}

export default Details;