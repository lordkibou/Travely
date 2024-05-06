import { useFormContext } from 'react-hook-form';
import { HotelFormData } from '../../types/mainTypes';

const DetailsSection = () => {
    const {
        register,
        formState: { errors }
    } = useFormContext<HotelFormData>();

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>
            <label className="text-gray-700 text-sm font-bol flex-1">
                Name
                <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("name", { required: "This field is required" })}
                ></input>
                {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
            </label>

            <div className='flex gap-4'>
                <label className="text-gray-700 text-sm font-bol flex-1">
                    City
                    <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("city", { required: "This field is required" })}
                    ></input>
                    {errors.city && (
                    <span className="text-red-500 text-sm">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bol flex-1">
                    Country
                    <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("country", { required: "This field is required" })}
                    ></input>
                    {errors.country && (
                    <span className="text-red-500 text-sm">{errors.country.message}</span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bol flex-1">
                Description
                <textarea
                    rows={8}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "This field is required" })}
                ></textarea>
                {errors.description && (
                <span className="text-red-500 text-sm">{errors.description.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bol max-w-[50%]">
                Price per night
                <input
                    type='number'
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", { required: "This field is required" })}
                ></input>
                {errors.pricePerNight && (
                <span className="text-red-500 text-sm">{errors.pricePerNight.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bol max-w-[50%]">
                Star rating
                <select
                    {...register("starRating", {
                        required: "This field is required"
                    })}
                    className='border rounded w-full p-2 text-gray-700 font-normal'
                >
                    <option value="" className='text-sm font-bold'>
                        Select a star rating
                    </option>
                    {
                        [1, 2, 3, 4, 5].map((rating) => (
                            <option value={rating} className='text-sm font-bold'>{rating}</option>
                        ))
                    }
                </select>
                {errors.starRating && (
                <span className="text-red-500 text-sm">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    );
}

export default DetailsSection;