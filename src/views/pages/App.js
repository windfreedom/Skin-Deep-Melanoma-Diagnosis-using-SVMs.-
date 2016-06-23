import React, {PropTypes} from 'react'

import {
  Layout,
  Header,
  Navigation,
  Drawer,
  Content
} from 'react-mdl'

import { Link } from 'react-router';

import TabLink from '../components/TabLink.js';
import DrawerLink, { hideDrawer } from '../components/DrawerLink.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends React.Component {
    render() {
      return (
        <Layout fixedHeader>
          <Header scroll title={<Link className="NoDecorate InheritColor" to={`/`}>SkinDeep</Link>} className="DesktopNav MobileDrawer">
            <Navigation>
              <TabLink _isIndex to={`/`}>Home</TabLink>
              <TabLink to={`/submit`}>Submit an Image</TabLink>
              <TabLink to={`/diagnosis`}>Retrieve Diagnosis</TabLink>
              <TabLink to={`/about`}>About Us</TabLink>
            </Navigation>
          </Header>
          <Drawer title={<Link className="NoDecorate InheritColor" to={`/`} onClick={hideDrawer}>SkinDeep</Link>}>
            <Navigation>
              <DrawerLink _isIndex to={`/`}>Home</DrawerLink>
              <DrawerLink to={`/submit`}>Submit an Image</DrawerLink>
              <DrawerLink to={`/diagnosis`}>Retrieve Diagnosis</DrawerLink>
              <DrawerLink to={`/about`}>About Us</DrawerLink>
            </Navigation>
          </Drawer>
          <ReactCSSTransitionGroup
            component={Content}
            className="react-transition"
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname,
            })}
          </ReactCSSTransitionGroup>
        </Layout> )

    }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
