import { enqueueSnackbar, closeSnackbar } from "notistack";

export const CarRemovedFromCart = () => {
    enqueueSnackbar('The car has been removed from cart', {
        variant: 'info',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const CarAddedToCart = () => {
    enqueueSnackbar('The car has been added to cart', {
        variant: 'info',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const SignedSuccesfully = () => {
    enqueueSnackbar('Signed in successfully', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}
export const AlreadyAccountWithEmail = () => {
    enqueueSnackbar('Already have a user account with this email', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const WrongEmailPassword = () => {
    enqueueSnackbar('Wrong email or password', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const PutEmailPassword = () => {
    enqueueSnackbar('Put your email and password', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const RegisteredSucessfully = () => {
    enqueueSnackbar('Your account has been created successfully!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const RegisterFail = () => {
    enqueueSnackbar('An error occurred while creating your account. Please try again later', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}

export const FillInputsFixErrors = () => {
    enqueueSnackbar('Please fill all required fields and fix any validation errors', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}