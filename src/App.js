import React, {
  Component
} from "react";
import Wrapper from "./components/wrapper/Index";
import Header from "./components/header";
import Card from "./components/card"
import images from "./images.json";
import Banner from "./components/banner"

import './App.css';
class App extends Component {

  state = {
    images,
    score: 0,
    highScore: 0,
    gameMessage: "Click an image to begin!",
    gameMsgColor: "correct"
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({
        highscore: this.state.score
      }, function () {
        console.log(this.state.highscore);
      });
    }
    this.state.images.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({
      score: 0
    });
    return true;
  }

  clickCount = id => {
    this.state.images.find((obj, index) => {
      if (obj.id === id) {
        if (images[index].count === 0) {
          images[index].count = images[index].count + 1;
          this.setState({
            score: this.state.score + 1
          }, function () {
            console.log(this.state.score);
            if (this.state.score > this.state.highScore)
              this.setState({
                highScore: this.state.score
              });
          });

          this.setState({
            gameMessage: "You guessed correctly!"
          });
          this.state.images.sort(() => Math.random() - 0.5)
          return true;
        } else {
          this.setState({
            gameMessage: "You guessed incorrectly!"
          });
          this.gameOver();
          return true;
        }
      }
    });
  }

  render() {
    return ( <
      Wrapper >
      <
      Header score = {
        this.state.score
      }
      highScore = {
        this.state.highScore
      }
      gameMessage = {
        this.state.gameMessage
      } > Clicky Game < /Header> <
      div className = "container d-flex flex-wrap justify-content-center" >
      <
      Banner / > {
        this.state.images.map(card => ( <
          Card clickCount = {
            this.clickCount
          }
          id = {
            card.id
          }
          key = {
            card.id
          }
          image = {
            card.image
          }
          /> 
        ))
      } < /div> <
      /Wrapper>
    );
  }
}


export default App;