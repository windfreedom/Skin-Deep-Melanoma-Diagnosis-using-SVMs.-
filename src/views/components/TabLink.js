import { Link, IndexLink } from 'react-router';

const TabLink = (props) => props._isIndex ? <IndexLink activeClassName="CurrentTabLink" {...props}>{props.children}</IndexLink> : <Link activeClassName="CurrentTabLink" {...props}>{props.children}</Link>;

export default TabLink;
