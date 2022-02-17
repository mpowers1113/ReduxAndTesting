import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import { UserIcon } from '@heroicons/react/outline';
class Login extends React.Component {
  componentDidMount() {
    this.scopes = 'profile email';
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '460055702062-5b2ppnc7a47gg8djmcu5vld1372911ki.apps.googleusercontent.com',
          scope: this.scopes,
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      const profile = this.auth.currentUser.get().getBasicProfile();
      const profileData = {
        imageUrl: profile.getImageUrl(),
        fullName: profile.getName(),
        lastName: profile.getFamilyName(),
        firstName: profile.getGivenName(),
        email: profile.getEmail(),
        id: profile.getId(),
      };
    } else this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderButton = (props, text) => {
    return (
      <button
        onClick={props}
        type="button"
        className="inline-flex items-center font-bold px-4 py-2 border border-transparent shadow-sm text-sm rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400">
        <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        {text}
      </button>
    );
  };

  renderAuthButton = () => {
    if (!this.props.isSignedIn) {
      return <>{this.renderButton(this.onSignInClick, 'Sign In')}</>;
    }
    return <>{this.renderButton(this.onSignOutClick, 'Sign Out')}</>;
  };
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(Login);
