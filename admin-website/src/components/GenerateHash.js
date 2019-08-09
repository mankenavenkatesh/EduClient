import React, { Component } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import Input from "./UI/Input";
import { OrangeButton } from "./UI/Button";


class GenerateHash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file : null,
      certificateHash: this.props.certificateHash
    };
    
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);    

  }

  onFormSubmit(e){
    const { handlehashGeneration } = this.props;
    e.preventDefault();
    var f = this.state.file;
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        console.log("base64-"+base64String);   
        handlehashGeneration({
          certString: base64String          
        });     
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
    console.log(this.state.file.name);

}

  onChange(e) {
    this.setState({file:e.target.files[0]});
  }


  

  render() {
    console.log("Inside Generate Hash -"+this.state.certificateHash);
    return (
      
      
      <form onSubmit={this.onFormSubmit}>
      <h1>File Upload</h1>
      <input type="file" name="myImage" onChange= {this.onChange} />
      <button type="submit">Generate Hash</button>
      <br/>
      <br />      
      🎉 Certificate Hash - <HashColor hashee={this.state.certificateHash} />
    </form>


    );
  }
}

export default GenerateHash;

GenerateHash.propTypes = {
  adminAddress: PropTypes.string,
  storeAddress: PropTypes.string,
  deploying: PropTypes.bool,
  deployedTx: PropTypes.string,
  networkId: PropTypes.number,
  loadAdminAddress: PropTypes.func,
  handleStoreDeploy: PropTypes.func
};
