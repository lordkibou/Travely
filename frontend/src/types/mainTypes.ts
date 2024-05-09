type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignInFormData = {
  email: string;
  password: string;
};

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

//I want to extend the ToastMessage type and in ToastProps add a function

type ToastProps = ToastMessage & {
    onClose: () => void;
}

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
}

type PropsManageHotelForm = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}

export type {
  RegisterFormData,
  ToastMessage,
  AppContext,
  ToastProps,
  SignInFormData,
  HotelFormData,
  PropsManageHotelForm
};
