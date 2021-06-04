import React from "react";
import NotFoundImg from "../../images/not-found.svg"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="center max-w-md text-center">
      <img src={NotFoundImg} alt="404 Aesthetic Illustration" className="max-w-xs mb-10" />
      <h1 className="h1 text-gray-500">404 - Not Found</h1>
      <p className="text-gray-500">Sorry, the resource you were looking for was not found. You could still visit <Link to="/" className="underline">Home</Link></p>
    </div>
  );
};

export default NotFound;
