import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import BackIcon from '../icons/BackIcon';

function LoginScreen() {

  // const [editMode, setEditMode] = useState(false);
  const [newReg, setNewReg] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regBadUser, setRegBadUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const navigate = useNavigate();

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handlePasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  }

  const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  useEffect(() => {
    console.log(password);
  }, [password]);

  useEffect(() => {
    console.log(passwordCheck);
  }, [passwordCheck]);

  const handleRegistrationPage = () => {
    setNewReg((prev) => !prev);
  }

  const handleReturnLoginClick = () => {
    setNewReg((prev) => !prev);
  }

  const handleNewRegistration = () => {

    if(password === passwordCheck) {
        const userToAdd:User = {
          userName: userName,
          userPass: password,
        };

        console.log(userToAdd);

        // Validate user information at API endpoint 'validateUser'
        fetch("https://mnmltodobackend.onrender.com/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToAdd)

      })
      .then(response => {
        if (response.ok) {
          // User created successfully
          console.log("Registration success");
          setRegSuccess(true);
        } else {
          // Other error
          console.log("An error occurred");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });

      setPasswordMismatchError(false);
      setNewReg((prev) => !prev);
    } else {
      setPasswordMismatchError(true);
      console.log("Password doesn't match.");
    }

  }

  const handleCancel = () => {
    if (regBadUser == true) {
      setRegBadUser((prev) => !prev);
    }
    if (passwordMismatchError == true) {
      setPasswordMismatchError((prev) => !prev);
    }
    if (regSuccess == true) {
      setRegSuccess((prev) => !prev);
    }
  }

  const handleLoginClick = () => {
    const userToValidate:User = {
      userName: userName,
      userPass: password,
    };

    console.log("Username: " + userName);
    console.log("Password: " + password);

    // Validate user information at API endpoint 'validateUser'
    fetch("https://mnmltodobackend.onrender.com/validate-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToValidate)
  })
  .then(response => {
    if (response.ok) {
      // User validated, navigate to '/task-board'
      navigate('/task-board', {
        state: { currentUser : userToValidate }
      });
    } else if (response.status === 404) {
      // User not found
      console.log("User not found");
      setRegBadUser(true);
    } else {
      // Other error
      console.log("An error occurred");
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
  }

  if (newReg) {
    return (
      <div className="
      m-auto
      flex
      flex-col
      py-40
      w-full
      min-h-screen
      items-center
      text-center
      overflow-x-auto
      overflow-y-hidden
      px-[20px]
      bg-pageBackgroundColor
    ">
      <div className="
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-xl
        flex
        flex-col
        p-8
      ">
          
          <div className="
          flex
          justify-between
            px-[13px]
            text-[32px]
            text-mainAccentColor
            text-left
            font-bold
          ">
            Create
            <button className="stroke-mainAccentColor"
            onClick={handleReturnLoginClick}
            >
              <BackIcon />
            </button>
              
          </div>
          <div className="
            px-[13px]
            text-[18px]
            text-mainAccentColor
            text-left
            font-medium
            ">
              Account</div>
        
        <div className="
          flex
          flex-col
          p-2
        ">
          <div className="flex items-center mb-4">
            <input className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
              mt-8
            "
            placeholder="User ID" 
            value={userName}
            onChange={handleUserName}
            onClick={() => { 
              //setEditMode(true); 
            }}/>
          </div>
          <div className="flex flex-col mb-2">
            <input type="password" className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
              mb-4
            "
            placeholder="Password" 
            value={password}
            onChange={handlePassword}
            onClick={() => { 
              //setEditMode(true); 
            }}/>
            <input type="password" className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
            "
            placeholder="Confirm password" 
            value={passwordCheck}
            onChange={handlePasswordCheck}
            onClick={() => { 
              //setEditMode(true); 
            }}/>
          </div>
        </div>
        
        {newReg && passwordMismatchError && (
            <div className="
            fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-mainBackgroundColor bg-opacity-50
            ">
                <div className="bg-pageBackgroundColor rounded-lg p-6">
                        <p>Passwords do not match.</p>
                    <div className="mt-4 flex justify-center">
                        <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={handleCancel}
                        >
                        OK
                        </button>
                    </div>
                </div>
            </div>
        )}
        <div className='
        flex
        flex-col
        items-center
        mt-6
        '>
          <button className="
            max-w-[200px]
            border-2
            px-8
            py-2
            rounded-xl
            border-mainAccentColor
            border-opacity-50
            hover:bg-mainAccentColor
            hover:text-columnBackgroundColor
          "
          onClick={handleNewRegistration}
          >Register</button>
        </div>
      </div>
    </div>
    );
  }
  
  return (
    <div className="
      m-auto
      flex
      flex-col
      py-40
      w-full
      min-h-screen
      items-center
      text-center
      overflow-x-auto
      overflow-y-hidden
      px-[20px]
      bg-pageBackgroundColor
    ">
      <div className="
        bg-columnBackgroundColor
        w-[350px]
        h-[430px]
        max-h-[500px]
        rounded-xl
        flex
        flex-col
        p-8
      ">
        <div className="
          px-[13px]
          text-[32px]
          text-mainAccentColor
          text-left
          font-bold
        ">
          Log in
            <div className="
            text-[18px]
            text-mainAccentColor
            text-left
            font-medium
            ">
              to get productive</div>
        </div>
        
        <div className="
          flex
          flex-col
          p-2
        ">
          <div className="flex items-center mb-4">
            <input className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
              mt-8
            "
            placeholder="User ID"
            value={userName}
            onChange={handleUserName}
            onClick={() => { 
              //setEditMode(true); 
            }}/>
          </div>
          <div className="flex flex-col mb-2">
            <input type="password" className="
              bg-mainBackgroundColor
              text-md
              h-[60px]
              w-[270px]
              rounded-xl
              p-5
              font-bold
              border-columnBackgroundColor
              hover:text-mainAccentColor
              border-4
              flex
              items-center
              placeholder-mainAccentColor
              placeholder-opacity-50
            "
            placeholder="Password" 
            value={password}
            onChange={handlePassword}
            onClick={() => { 
              //setEditMode(true); 
            }}/>
            <button className="
              rounded-xl
              text-left
              py-3
              px-2
              text-mainAccentColor
              opacity-50
              hover:opacity-100
              text-[12px]
            "
            onClick={handleRegistrationPage}
            >Register here</button>
          </div>
        </div>
        <div className='
        flex
        flex-col
        items-center
        mt-3
        '>
          <button className="
            max-w-[200px]
            border-2
            px-8
            py-2
            rounded-xl
            border-mainAccentColor
            border-opacity-50
            hover:bg-mainAccentColor
            hover:text-columnBackgroundColor
          "
          onClick={handleLoginClick}
          >Login</button>
        </div>

        {regBadUser && (
            <div className="
            fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-mainBackgroundColor bg-opacity-50
            ">
                <div className="bg-pageBackgroundColor rounded-lg p-6">
                        <p>Username or password was incorrect.</p>
                    <div className="mt-4 flex justify-center">
                        <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={handleCancel}
                        >
                        OK
                        </button>
                    </div>
                </div>
            </div>
        )}

        {regSuccess && (
            <div className="
            fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-mainBackgroundColor bg-opacity-50
            ">
                <div className="bg-pageBackgroundColor rounded-lg p-6">
                        <p>Registration Successful.</p>
                    <div className="mt-4 flex justify-center">
                        <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={handleCancel}
                        >
                        OK
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

export default LoginScreen;
