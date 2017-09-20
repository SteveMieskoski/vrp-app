// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Userpage = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    console.log('got state?');
    return {history: ""};
  },

  render: function() {
    var that = this;
    var searches = this.props.searches;
    if (searches.length === 0) {
      searches = [{title: "The White House", 
      url:"data:image/jpeg;base64,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", 
      date: "October 8, 2010"},
      {title: "Mt.Rushmore",
      url:"data:image/jpeg;base64,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",
      date: 'January 10, 2014'},
      {title: "Golden Gate Bridge",
      url: "data:image/jpeg;base64,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",
      date: 'August 8, 2016'}];
    }
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-default" style = {{backgroundColor:"transparent !important", border: "1px solid #1da1f2"}}>
            <div className="panel-heading text-center" style = {{backgroundColor:"transparent !important", border: "1px solid #1da1f2"}}>
              <h3 className="panel-title"><b>Your Search History</b></h3>
            </div>
            <div className="panel-body">
              <div className="panel-body text-center">
                {/* Here we use a map function to loop through an array in JSX */}
                {searches.map(function(search, i) {
                    console.log(search);
                    return (
                      <div className="panel-body text-center" key = {i} border="1px solid #1da1f2">
                          <a href={search.url}><img src = {search.url} alt = "white_house_image" style = {{borderRadius:"8px"}}></img></a>
                          <br></br>
                          <br></br>
                          <p><b>{search.title}</b></p>
                          <p><b>{search.date}</b></p>
                          <button type="button" className="btn btn-default" onClick={that.handleDelete}  value={search._id}>Delete</button>
                      </div>
                    );
                  })}                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Userpage;