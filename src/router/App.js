import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

        
const Homepage = () => (<div>Homepage</div>)
const PrivateProfile = () => (<div>PrivateProfile</div>)
const PublicProfile = () => (<div>PublicProfile</div>)
const DraftProfile = () => (<div>DraftProfile</div>)
const Profile = (props) => (<div>
    <Route path={`${props.match.path}`} render={() => (<h1>Profile</h1>)}/>
    <Switch>
        <Route path={`${props.match.path}/private`} component={PrivateProfile}/>
        <Route path={`${props.match.path}/draft`} component={DraftProfile}/>
        <Route path={`${props.match.path}`} component={PublicProfile}/>
    </Switch>
</div>)
const Settings = () => (<div>Settings</div>)

const ProductDetails = (props) => (<div>{`Displaying details for  ${props.match.params.productId} in ${props.match.params.view}`}</div>)


const Navigation = () => (<div>
    <h2>Navigation</h2>
    <Link to="/">Homepage</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/setting">Settings</Link>
    <Link to="/product/123/center">Product</Link>

</div>)


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: true,
            isLoggedIn: false,
        }
    }
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route render={()=>(<h1>Header</h1>)}/>
                    <Navigation/>
                    <Switch>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/product/:productId/:view" component={ProductDetails}/>
                        {
                            this.state.isAdmin ? (
                                <Route path="/setting" component={Settings}/>
                            ) : null
                        }
                        <Route path="/" component={Homepage}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;