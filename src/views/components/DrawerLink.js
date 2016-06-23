import { Link, IndexLink } from 'react-router';
import $ from 'jquery';


const hideDrawer = () => {
  $(".mdl-layout__drawer").toggleClass("is-visible");
  $(".mdl-layout__obfuscator").toggleClass("is-visible");
  return true;
}


const DrawerLink = (props) => props._isIndex? <IndexLink activeClassName="CurrentDrawerLink" onClick={hideDrawer} {...props}>{props.children}</IndexLink> : <Link onClick={hideDrawer} activeClassName="CurrentDrawerLink" {...props}>{props.children}</Link>;

export default DrawerLink;
export { hideDrawer };
