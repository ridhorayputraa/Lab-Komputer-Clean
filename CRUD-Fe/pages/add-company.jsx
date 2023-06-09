import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Addcompany = () => {
  const [CompanyID, setCompanyId] = useState(0);
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyAddress, SetCompanyAddress] = useState("");
  const [CompanyEstablishDate, SetCompanyEstablishDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:8000/api/company/", {
          CompanyName,
          CompanyAddress,
          CompanyEstablishDate,
          CompanyID,
        })

        .then((res) => {
          setSuccessMessage("Data berhasil ditambahkan");
        })

        .catch((err) => {
          console.log(err)
          setSuccessMessage(err.message);
        });

      console.log(CompanyAddress);

      // Redirect or show success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name:</label>
          <input
            className="w-full border border-gray-300 rounded py-2 px-3"
            type="text"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Address:</label>
          <input
            className="w-full border border-gray-300 rounded py-2 px-3"
            type="text"
            value={CompanyAddress}
            onChange={(e) => SetCompanyAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            date: [2023-10-6]
          </label>
          <input
            className="w-full border border-gray-300 rounded py-2 px-3"
            type="text"
            value={CompanyEstablishDate}
            onChange={(e) => SetCompanyEstablishDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Company Id:</label>
          <input
            className="w-full border border-gray-300 rounded py-2 px-3"
            type="text"
            value={CompanyID}
            onChange={(e) => setCompanyId(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
      {successMessage && (
        <div className="mt-4">
          {successMessage}
          <Link className="ml-2 text-blue-500" href="/Companylist">
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Addcompany;
