import React from "react";

const FormError = ({ message }: { message: string }) => {

  return <div className=" bg-error/20 text-error p-4 rounded-md my-2">{message}</div>;
};

export default FormError;
