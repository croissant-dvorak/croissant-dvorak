var React = require('react');

const LoginButton = ({cookieReader}) => {

  return (
    <div>
      <button onClick={() => cookieReader()}><a href='http://localhost:4040/login'>Login with FB</a></button>
    </div>
  );
};

module.exports = LoginButton;
