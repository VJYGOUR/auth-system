import { useForm } from "react-hook-form";

import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import handleApiError from "../utils/handleApiError";

// Define the form data interface
interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the response interface
interface SignupResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const [successMessage, setSuccessMessage] = useState("");

  // Watch password for confirmation validation
  // const password = watch("password");

  const onSubmit = async (data: SignupForm) => {
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post<SignupResponse>(
        "/auth/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );

      // Handle successful signup
      console.log("Signup successful:", response.data);
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );

      // // Redirect to login after delay
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 2000);
    } catch (error) {
      console.error("Signup failed:", error);

      handleApiError(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name must not exceed 50 characters",
              },
            })}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must not exceed 20 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Password must contain at least one lowercase letter, one uppercase letter, and one number",
              },
            })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        {/* <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div> */}

        {/* Server Error */}
        {errors.root && (
          <div className="server-error">{errors.root.message}</div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
};

export default Signup;
