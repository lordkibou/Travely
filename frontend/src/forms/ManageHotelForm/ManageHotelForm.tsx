import type { HotelFormData } from "../../types/mainTypes";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";

const ManageHotelForm = () => { 
    const formMethods = useForm<HotelFormData>();
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10">
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;