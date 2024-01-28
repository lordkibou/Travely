import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.ts";

const SignOutButton = () => {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      //Invalidate the query in order to refetch it
      //Because the user is no longer authenticated
      await QueryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out Successfully", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex rounded bg-white items-center text-blue-600 px-3 font-semibold hover:bg-gray-100"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
