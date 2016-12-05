var React = require('react');

const LogoutButton = () => {

  return (
    <div>
      <button onClick={() => cookieReader()}><a href='/logout'>Logout</a></button>
    </div>
  );
};

module.exports = LogoutButton;