import type { HotelFormData,PropsManageHotelForm } from "../../types/mainTypes";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";


const ManageHotelForm = ({onSave,isLoading}:PropsManageHotelForm) => { 
    const formMethods = useForm<HotelFormData>();
    const {handleSubmit} = formMethods;
    
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility,index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append("imageFiles", imageFile);
        });

        onSave(formData);
    });
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded disabled:bg-gray-500"
                    >
                        {isLoading? "Saving...": "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;