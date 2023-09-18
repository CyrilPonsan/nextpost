export const regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#\$%\^&\*])(?=.{8,})/;

export const regexNumber = /^[0-9]*$/;

export const regexGeneric = /^[a-zA-Z0-9\s,.'\-+éàè?î!âôêûù]{1,}$/;

export const regexOptionalGeneric = /^[a-zA-Z0-9\s,.'\-+éîàè?!âôêûù]{0,}$/;

export const regexUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
