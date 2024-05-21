"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import { json } from 'stream/consumers';

interface DBRecord {
  name: string;
  company: string;
  email: string;
  id: string;
  city: string;
};

function createUUID() {
  var s:any[] = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}

function Item({ data: data, setObjectBeingEdited: setObjectBeingEdited }: { data: DBRecord, setObjectBeingEdited: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {data.name}
        </th>
        <td className="px-6 py-4">
            {data.email}
        </td>
        <td className="px-6 py-4">
            {data.company}
        </td>
        <td className="px-6 py-4">
            {data.city}
        </td>
        <td className="px-6 py-4">
        <button type="button" className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={async () => {
          setObjectBeingEdited(data.id);
        }}>Edit</button>
        </td>
        <td className="px-6 py-4">
        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={async () => {
          await fetch(`/api/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ "id": data.id })
          });
          window.location.reload();
        }}>Delete</button>
        </td>
    </tr>
  );
}

export default function Home() {
  const [data, setData] = useState<DBRecord[]>([]);
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [nameEdit, setNameEdit] = useState<string>('');
  const [companyEdit, setCompanyEdit] = useState<string>('');
  const [emailEdit, setEmailEdit] = useState<string>('');
  const [cityEdit, setCityEdit] = useState<string>('');
  const [objectBeingEdited, setObjectBeingEdited] = useState<string>("");
  useEffect(() => {
    fetch('/api/customerData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(d => setData(d.customers));
  }, []);
  useEffect(() => {
    if (objectBeingEdited !== "") {
      const object = data.find(x => x.id == objectBeingEdited);
      setNameEdit(object?.name !== undefined ? object.name : "");
      setEmailEdit(object?.email !== undefined ? object.email : "");
      setCompanyEdit(object?.company !== undefined ? object.company : "");
      setCityEdit(object?.city !== undefined ? object.city : "");
    }
  }, [objectBeingEdited])

  // Input handlers
  const handleNameInput = async (e: any) => {
    const fieldValue = e.target.value;

    await setName(fieldValue);
  }
  const handleCompanyInput = async (e: any) => {
    const fieldValue = e.target.value;

    await setCompany(fieldValue);
  }
  const handleEmailInput = async (e: any) => {
    const fieldValue = e.target.value;

    await setEmail(fieldValue);
  }
  const handleCityInput = async (e: any) => {
    const fieldValue = e.target.value;

    await setCity(fieldValue);
  }
  //for editing modal
  const handleNameEdit = async (e: any) => {
    const fieldValue = e.target.value;

    await setNameEdit(fieldValue);
  }
  const handleCompanyEdit = async (e: any) => {
    const fieldValue = e.target.value;

    await setCompanyEdit(fieldValue);
  }
  const handleEmailEdit = async (e: any) => {
    const fieldValue = e.target.value;

    await setEmailEdit(fieldValue);
  }
  const handleCityEdit = async (e: any) => {
    const fieldValue = e.target.value;

    await setCityEdit(fieldValue);
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    const id = createUUID();
    await setData([...data, {
      "id": id,
      "name": name,
      "email": email,
      "company": company,
      "city": city
    }]);
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({
        "id": id,
        "name": name,
        "email": email,
        "company": company,
        "city": city
      })
    });
  }
  return (
    <div className="App">
      <h1 className='text-3xl font-bold text-center'>Customers</h1>
      <form onSubmit={submitHandler}>
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Name</label>
        <textarea
          value={name}
          onChange={handleNameInput}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Email</label>
        <textarea
          value={email}
          onChange={handleEmailInput}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Company</label>
        <textarea
          value={company}
          onChange={handleCompanyInput}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">City</label>
        <textarea
          value={city}
          onChange={handleCityInput}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <button 
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg mb-5"
          >
          Add
        </button>
      </form>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Comapany
                  </th>
                  <th scope="col" className="px-6 py-3">
                      City
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Delete
                  </th>
              </tr>
          </thead>
          <tbody>
              {data.map((event) => {return <Item key={event.id} data={event} setObjectBeingEdited={setObjectBeingEdited}/>})}
          </tbody>
        </table>
      </div>
      {objectBeingEdited !== "" ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-slate-700">
                <div className="relative p-6 flex-auto">
                  <form onSubmit={submitHandler}>
                      <label className="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Name</label>
                      <textarea
                        value={nameEdit}
                        onChange={handleNameEdit}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <br />
                      <label className="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Email</label>
                      <textarea
                        value={emailEdit}
                        onChange={handleEmailEdit}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <br />
                      <label className="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Company</label>
                      <textarea
                        value={companyEdit}
                        onChange={handleCompanyEdit}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <br />
                      <label className="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">City</label>
                      <textarea
                        value={cityEdit}
                        onChange={handleCityEdit}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <br />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    type="button"
                    onClick={() => setObjectBeingEdited("")}
                  >
                    Close
                  </button>
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="button"
                    onClick={() => {
                      const data_copy = [...data];
                      data_copy[data.findIndex(x => x.id == objectBeingEdited)] = {
                        "id": objectBeingEdited,
                        "name": nameEdit,
                        "email": emailEdit,
                        "company": companyEdit,
                        "city": cityEdit
                      };
                      setData(data_copy);
                      fetch('/api/edit', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data_copy[data_copy.findIndex(x => x.id == objectBeingEdited)])
                      });
                      setObjectBeingEdited("");
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
