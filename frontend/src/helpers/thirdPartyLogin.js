import { ToastContainer, toast } from 'react-toastify';
export const loginWithGoogle = async (e) => {
  e.preventDefault();
  toast.success("You have clicked on Google Login Button!")
}

export const loginWithGithub = async (e) => {
  e.preventDefault();
  toast.success("You have clicked on Github Login Button!")
}

export const loginWithTwitter = async (e) => {
  e.preventDefault();
  toast.success("You have clicked on Twitter Login Button!")
}