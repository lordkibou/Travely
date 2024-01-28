type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export type { RegisterFormData, ToastMessage, AppContext, ToastProps };
