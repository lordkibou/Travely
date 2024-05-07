import { useFormContext } from 'react-hook-form';
import { HotelFormData } from '../../types/mainTypes';
import { hotelTypes } from '../../config/hotel-options.config';
const TypeSection = () => { 

    const {
        register,
        watch,
        formState: { errors }
    } = useFormContext<HotelFormData>();

    const typeLabelStyle = "cursor-pointer text-sm rounded-full px-4 py-2 font-semibold";
    const typeWatch = watch("type");
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className='grid grid-cols-5 gap-2'>
                {
                    hotelTypes.map((type, index) => (
                        <label
                            key={index}
                            className={
                                typeWatch === type
                                    ? `${typeLabelStyle} bg-blue-300`
                                    : `${typeLabelStyle} bg-gray-300`
                            }>
                            <input
                                type="radio"
                                value={type}
                                className="hidden"
                                {...register("type", { required: `This field is required` })}
                            ></input>
                            <span>{type}</span>
                        </label>
                    ))
                }
            </div>
            {
                errors.type && (
                    <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
                )
            }
        </div>
    );
}

export default TypeSection;