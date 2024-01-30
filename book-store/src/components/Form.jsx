import { useForm } from "react-hook-form";
import { useState } from "react";
// For navigation
import { NavLink } from "react-router-dom";
import "./Form.css";

function App() {
  const [state, setState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // On click of SIGN UP, showing data entered in console
  const onSubmit = (data) => {
    console.log(data);
    setState(true);
  };


  return (
    <div>
      <div>
      <nav>
      <div className="logo">Kalvium Books</div>
      {/* Linking to homepage  */}
        <NavLink to="/">
        <button className="back">Back</button>
        </NavLink>
      </nav>
    </div>
      <div className="contain">
        {/* On submission of form, show, registration successful */}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="app">
            {state && <p className="success">REGISTRATION SUCCESSFUL!</p>}

            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              {...register("firstName", {
                required: "First Name is Required!",
                minLength: {
                  value: 3,
                  message: "Name must be more than 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password must be less than 30 characters",
                },
              })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}

            <label>Email:</label>
            <input
              type="text"
              name="email" 
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is Required!",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is Required!",
                minLength: {
                  value: 10,
                  message: "Password must be more than 10 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password must be less than 30 characters",
                },
                pattern: {
                  // For atleast one special character included 
                  value: /.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-].*/,
                  message: "Please include at least one special character",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <label>Confirm Password:</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Confirm password"
              {...register("repeatPassword", {
                required: "Confirmation is Required!",
                // if password does not match to the password entered before, shoe error
                validate: (value) =>
                  value === getValues("password") || "Password does not match",
              })}
            />
            {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
            <div className="button">
              <input type="submit" value="SIGN UP" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
