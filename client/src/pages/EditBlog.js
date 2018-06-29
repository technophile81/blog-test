import React from "react"
import { Link, withRouter } from "react-router-dom";
// Withrouter means this component has access to router
import axios from "axios";
import Auth from '../auth/Auth.js';

const auth = new Auth();

class EditBlog extends React.Component {
  state = {
    title: "",
    body: ""
  }
  handleInputChange = event => {
      const {name, value} = event.target;
      console.log(name);
      this.setState({ [name]: value});
  }
  componentDidMount(){
    this.props.auth.login();
    // one auth utility to pass to all components
  }
  postBlog = event => {
    event.preventDefault();
    const { title, body} = this.state;
    axios.post("/api/blog", {title, body}).then(res => {
      console.log(res);
      this.setState({ title: "", body: ""});
      this.props.history.push("/"); // this will go back to blog page after submit
    })
  }
render(){
  return (
    <div>
      <Link to="/">Home</Link>
      <form>
        <input name="title" onChange={this.handleInputChange}  value={this.title} />
        <textarea name="body" onChange={this.handleInputChange} value={this.body} />
        <button onClick={this.postBlog}>Submit</button>
      </form>
    </div>
  );
}

}

export default withRouter(EditBlog);
// can expect a prop that has access to the router