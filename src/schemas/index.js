/* eslint-disable */
import * as yup from 'yup'

const phoneNumberRegex = /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/

export const basicSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  emailAddress: yup.string().email("Please enter a valid email").required("Email is required"),
  phoneNumber: yup.string().min(14, "Ensure you follow the format [e.g. +2348101217017]").matches(phoneNumberRegex, {message: "Please enter a valid Nigerian phone number"}).required("Phone number is required")
})