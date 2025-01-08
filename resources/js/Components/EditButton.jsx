import react from "react";

const EditButton = ({ onClick }) => {
    return (
        <button  onClick={onClick} className="ml-auto text-gray-500 hover:text-blue-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232a3 3 0 114.243 4.243l-10 10a3 3 0 01-1.414.757l-3 0.5a1 1 0 01-1.2-1.2l0.5-3a3 3 0 01.757-1.414l10-10z" />
            </svg>
        </button>
    );
};

export default EditButton;