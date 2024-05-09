import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm.tsx";
import { useMutation } from "react-query";
import * as apiClient from "../api-client.ts";
import { useAppContext } from "../contexts/AppContext.tsx";

const AddHotel = () => {

  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      showToast({ message: "Hotel added successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = async (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm onSave={handleSave} isLoading = {isLoading} />
  );
};
export default AddHotel;
