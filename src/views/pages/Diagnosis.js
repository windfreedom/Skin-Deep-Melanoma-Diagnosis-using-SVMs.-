import React from 'react';
import {
  Grid,
  Cell,
  Card,
  CardTitle,
  CardText,
  Button,
  Textfield
} from 'react-mdl'
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss'
import $ from 'jquery';

class Diagnosis extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      ready: false,
      image: null,
      diagnosis: null,
      text: []
    }
  }
  onKeyDownToken(e) {
    if(e.keyCode == 13) this.onClickRetrieve();
    var token = e.target.value
    if(token.match(/^\w+\s+\w+\s*$/)) {
      this.setState({
        ready: true,
        token: token
      })
    } else {
      this.setState({ready: false})
    }
  }
  onClickRetrieve() {
    this.setState({})
    $.ajax({
      method: 'GET',
      url: 'http://skindeep.patrickpan.com:3010/results',
      data: {
        token: this.state.token
      },
      success: function(data) {
        this.setState({
          ready: false,
          image: data.image,
          diagnosis: data.diagnosis,
          text: data.text
        })

      }.bind(this),
      error: function() {
        this.setState({
          ready: false,
          image: "http://patrickpan.com/me3.jpg",
          diagnosis: "Benign Growth",
          text: ["You don't have cancer. Nice.", "Keep wearing sunscreen!"]
        })

      }.bind(this),

    })
  }
  render() {
    if(this.state.diagnosis !== null) {
      var diagnosis =
      <Cell col={12}>
        <Card shadow={4} className="TextCard DiagCard">
          <CardTitle className="CardTitle" style={{background: `url(${this.state.image}) top center / cover`}}>{this.state.diagnosis}</CardTitle>
          <CardText>
            {this.state.text.map(x => <div className="ContentLine">{x}</div>)}
          </CardText>
        </Card>
      </Cell>
    } else var diagnosis = null;
    return <Grid className="MainGrid">
      <Cell col={12}>
        <Card shadow={4} className="TextCard">
          <CardTitle className="CardTitle">
            Retrieve Diagnosis
          </CardTitle>
          <CardText>
            <div id="token-entry">
              <Textfield
                onKeyDown={this.onKeyDownToken.bind(this)}
                label="Your Token"
                error="A token consists of an adjective and an animal."
                pattern="\w+\s+\w+\s*"
                floatingLabel
              />
              <Button ripple colored raised disabled={this.state.ready === false} onClick={this.onClickRetrieve.bind(this)}>Retrieve</Button>
            </div>
          </CardText>
        </Card>
      </Cell>
      {diagnosis}

    </Grid>
  }
}

export default Diagnosis;
