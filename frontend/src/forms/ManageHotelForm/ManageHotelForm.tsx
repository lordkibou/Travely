import type { HotelFormData } from "../../types/mainTypes";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

const ManageHotelForm = () => { 
    const formMethods = useForm<HotelFormData>();
    return (
        <FormProvider {...formMethods}>
            <form>
                <DetailsSection />
                <TypeSection />
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;