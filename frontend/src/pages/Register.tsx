import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client.ts";
import { useAppContext } from "../contexts/AppContext.tsx";
import { RegisterFormData } from "../types/mainTypes.ts";

const Register = () => {
  {
    /*register is used for the required and dealing with the fields of the form
      we use watch to watch the password field and then compare it to the confirm password field
      handleSubmit is used to handle the submit of the form
    */
  }

  const { showToast} = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  //This happens when form is submitted, it calls the register function
  //that does the fetch request to the backend
  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({message: "Account created successfully", type: "SUCCESS"})
    },
    onError: (error:Error) => {
      showToast({message: error.message, type: "ERROR"})
    }
  })
  
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bol flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {/*The span if always true so if there is an error it will show the error*/}
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bol flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bol flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bol flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        ></input>
        {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bol flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val:string):string | undefined => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 rounded text-base hover:bg-blue-500"
        >
          Create an Account
        </button>
      </span>
    </form>
  );
};
export default Register;
