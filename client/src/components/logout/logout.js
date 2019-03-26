import React from 'react';
import{
  getFromStorage,
  setInStorage,
} from '../../utils/storage'
import {
   Button 
} from 'antd';
import   '../../antd/dist/antd.css';
import axios from 'axios';
class logout extends React.Component {

  state = {
    
  }

 logout = () => {
     console.log('click')
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
        const { token } = obj;
        //verify token
        fetch('http://localhost:3001/api/account/logout?token=' + token).then((res) => res.json()).then((json) => {
            console.log(json)
            if (json.success) {
                this.setState({
                    token: ''
      });
      //set the blank UserSession token into the local storage
      setInStorage('the_main_app', { token: this.state.token });
      setInStorage('trackrr',  {Usertoken: '' });
      //redirct them to the home page
      window.location.assign('/');
            }
        });
    }
 }

  render() {
    
    return (
     <div>
        <Button 
        type="primary"
        onClick={this.logout}
        >Primary</Button>
     </div>
    );
  }
}



export default logout;