import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Form.css";

function App() {
  const [state, setState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    setState(true);

    localStorage.setItem("formData", JSON.stringify(values));
    sessionStorage.setItem("formData", JSON.stringify(values));
  };

  return (
    <div>
      <div className="contain">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="app">
            {state && <p>Registration Successful!</p>}

            <label>Name:</label>
            <input
              type="text"
              name="firstName"
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
                  value: 20,
                  message: "Password must be less than 20 characters",
                },
                pattern: {
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
