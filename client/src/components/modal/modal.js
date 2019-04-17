import React from 'react';
import {
    Modal, Button
} from 'antd';


  function warning() {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  } 
class Modalinfo extends React.Component {
  render() {
    return (
       <Button onClick={warning}>Warning</Button>
    );
  }
}



export default Modalinfo;