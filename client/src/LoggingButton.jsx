var React = require('react');

const LoggingButton = () => {

	// var login = function(){
	// 	$.ajax({
 //            url: '/login',
 //            success: function(data) {
 //                console.log("login reroute to FB success");
 //            }.bind(this),
 //            error: function(err) {
 //                console.error("login reroute to FB success", err.toString());
 //            }.bind(this),
 //        });
	// }

  return (
    <div>
      <button><a href='/login'>Login with FB</a></button>
    </div>
  );
};

module.exports = LoggingButton;
