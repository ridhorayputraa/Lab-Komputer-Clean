"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import NextLink from "next/link";
import { useRouter } from "next/router";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [error, SetError] = useState(null);

  // const router = useRouter()
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/company");
      setCompanies(response.data.data);
    } catch (error) {
      console.error(error);
      SetError(error.message);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company?keyword=${keyword}`
      );
      console.log(response.data.data);
      setCompanies(response.data.data);
    } catch (error) {
      console.log(error.response.data.meta.message);
      SetError(error.response.data.meta.message);
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/company/delete/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error(error);
      SetError(error.message);
    }
  };

  const betweenPageAdd = () => {
    router.push("https://example.com");
  };

  if (error) {
    return <div>Error: {error} lets restart the browser</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          className="p-2 border border-gray-300 mr-2"
          placeholder="Search by keyword"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/add-company"
      >
        Add Data
      </Link>
     
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">CompanyID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">date</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index + 1}>
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{company.CompanyID}</td>
              <td className="py-2 px-4">{company.CompanyName}</td>
              <td className="py-2 px-4">{company.CompanyAddress}</td>
              <td className="py-2 px-4">{company.CompanyAddress}</td>
              <td className="py-2 px-4">
                <button className="mr-2 bg-blue-500 text-white rounded-md px-2 py-1">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(company.id)}
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
