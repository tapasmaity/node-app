import React, { Component } from 'react';
import { getAllUsers } from '../../services/api/apiService';
import { connect } from 'react-redux';
import { ToastError, ToastSuccess } from '../../components/toast/ToastNotification';
import { setLoader, setUsers } from '../../services/store/loader'; // ✅ Correct combined slice import

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: []
    }
  }
  logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  /*
  * Api
  * Get All Users
  */
  allUsers = async () => {
    const { setLoader, setUsers } = this.props;
    console.log("Token from storage:", localStorage.getItem('token'));

    setLoader(true);
    try {
      const { data } = await getAllUsers();
      console.log("Response:", data);
      setUsers(data);  // ✅ Save users to Redux
      ToastSuccess('Users fetched successfully');
    } catch (error) {
      console.error('Error:', error);
      const message = error?.response?.data?.message || 'Something went wrong';
      ToastError(message);
    } finally {
      setLoader(false);
    }
  };

  render() {
    const { usersList } = this.props;

    return (
      <div className='m-5'>
        <h1>Welcome to Home</h1>

        <button
          className='btn btn-info text-white me-2'
          onClick={this.allUsers}
        >
          Users
        </button>
        <button
          className='btn btn-info text-white me-2'
          onClick={()=>this.setState({usersData: usersList})}
        >
          Users redux
        </button>
        <button
          className='btn btn-info text-white'
          onClick={this.logOut}
        >
          Log out
        </button>

        <div className='mt-4'>
          <h2>Users List:</h2>
          {usersList.length > 0 ? (
            <ul>
              {usersList.map((user, index) => (
                <li key={index}>{user.name}</li>  // Adjust according to your API response
              ))}
            </ul>
          ) : (
            <p>No users available</p>
          )}
        </div>

        <div className='mt-4'>
          <h2>Users List:</h2>
          {this.state.usersData.length > 0 ? (
            <ul>
              {this.state.usersData.map((user, index) => (
                <li key={index}>{user.name} : {user.email}</li>  // Adjust according to your API response
              ))}
            </ul>
          ) : (
            <p>Redux no users available</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersList: state.app.usersList,  // ✅ if combined in appSlice
});

const mapDispatchToProps = (dispatch) => ({
  setLoader: (status) => dispatch(setLoader(status)),
  setUsers: (users) => dispatch(setUsers(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
