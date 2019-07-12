import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ListPosts from "./components/ListPosts";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import DeletePost from "./components/DeletePost";
import DeleteConfirmed from "./components/DeleteConfirmed";
import EditConfirmed from "./components/EditConfirmed";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="card">
            <div className="button-group btn-group-lg">
              <Link to="/" className="btn btn-primary">
                Posts App Home
              </Link>
              <Link to="/create" className="btn btn-warning">
                Create New Post
              </Link>
            </div>
          </div>
        </div>
        <Route path="/" exact component={ListPosts} />
        <Route path="/create" component={CreatePost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/delete/:id" component={DeletePost} />
        <Route path="/delconfirmed" component={DeleteConfirmed} />
        <Route path="/editconfirmed" component={EditConfirmed} />
      </Router>
    );
  }
}

export default App;
