import { useFormContext } from 'react-hook-form';
import { HotelFormData } from '../../types/mainTypes';

const GuestsSection = () => {

    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className='bg-gray-300 py-6 px-4 flex gap-4 border rounded'>
                <label className="text-gray-700 text-sm font-semibold flex-1">
                    Adults
                    <input
                        type='number'
                        min={1}
                        defaultValue={1}
                        className="border rounded w-full py-2 px-3 font-normal"
                        {...register("adultCount", { required: "This field is required" })}
                    ></input>
                    {errors.adultCount && (
                    <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-semibold flex-1">
                    Children
                    <input
                        type='number'
                        min={0}
                        defaultValue={0}
                        className="border rounded w-full py-2 px-3 font-normal"
                        {...register("childCount", { required: "This field is required" })}
                    ></input>
                    {errors.childCount && (
                    <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
                    )}
                </label>
            </div>
        </div>
    )
}

export default GuestsSection;