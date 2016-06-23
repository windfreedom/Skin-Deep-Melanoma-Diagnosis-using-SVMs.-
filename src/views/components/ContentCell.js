import React from 'react';
import {
  Cell,
  Card, CardTitle, CardText, CardActions,
  Button
} from 'react-mdl';
import { Link } from 'react-router';

const createLink = (link, contents) => {
  if(typeof link == "array" || typeof link == "object") {
    var path = ["", ...link].join("/");
    return <Link className="NoDecorate" to={path} onClick={()=>true}>{contents}</Link>
  } else if (typeof link == "string") {
    return <a className="NoDecorate" href={link} onClick={()=>true}>{contents}</a>
  } else {
    return contents;
  }
}

const createButton = (data, i) => {
  var colored = data.colored && true;
  var innerEl = createLink(data.link, data.text);
  var id = data.id ? data.id : i;
  return <Button colored={colored} id={id} key={i} onClick={(e) => {if(e.target.tagName != "a") {e.target.children[0].click(); e.target.children[0].click(); console.log(e.target.children[0])}}}>{innerEl}</Button>
}

const ContentCell = (props) => {
  var data = props.data;
  if(data == undefined) {
    return <div>Error: Data undefined</div>
  }

  var col = ( typeof data.col == "number" ? data.col : data.col.desktop ) || 6
  var tablet = typeof data.col == "number" ? col : ( data.col.tablet || 6 );
  var phone = typeof data.col == "number" ? col : ( data.col.phone || 6 );
  var shadow = data.shadow || 4;
  var className = data.className;
  var buttons = data.buttons;
  if(buttons !== undefined && buttons !== null) {
    var actions = (
      <CardActions border>
        {buttons.map(createButton)}
      </CardActions>
    )
  } else {
    var actions = null;
  }
  if(data.body !== undefined) {
    var text = (
      <CardText>
        {data.body.map( (line, i) => <div key={i} className="ContentLine">{line}</div> )}
      </CardText>

    )
  }
  var imageStyle = data.image === undefined ? {} : {
    style: {
      "backgroundImage": `url(${data.image})`,
      "backgroundSize": "cover",
      "backgroundPosition": "center"
    }
  }
  return (
    <Cell col={col} tablet={tablet} phone={phone}>
      <Card shadow={shadow} className={className}>
        {createLink(data.link, <CardTitle className="CardTitle"  {...imageStyle}>{data.title}</CardTitle>)}
        {text}
        {actions}
      </Card>
    </Cell>
  )
}

const renderCell = (data, i) => <ContentCell key={i} data={data} />

export default ContentCell;
export { renderCell };
