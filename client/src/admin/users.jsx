import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Users() {
  const [users, setUsers] = useState();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios.get('/api/allusers', { withCredentials: true })
      .then(res => {
        setUsers(res.data);
      });
  }, [users]);

  const handleDelete = () => {
    if (userToDelete) {
      const filteredUsers = users.filter(user => user._id !== userToDelete);
      setUsers(filteredUsers);

      axios.delete('/api/delete/user/' + userToDelete)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const openDeleteConfirmation = (userId) => {
    setShowDeleteConfirmation(true);
    setUserToDelete(userId);
  };

  return (
    <div>
      {users ?
        <section className="antialiased mt-20 px-4">
          <div className="flex flex-col justify-center h-full">
            <div className="w-80 md:w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">phonenumber</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Country</div>
                        </th>
                        <th>
                          <div className="font-semibold text-center">Delete</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img className="rounded-full" src={`http://localhost:8000/public/usersImages/${user.filename}`} alt={user.name} />
                              </div>
                              <div className="font-medium text-gray-800">{user.name}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{user.email}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium">{user.phonenumber}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">{user.state}</div>
                          </td>
                          <td className="pl-10 text-xl" onClick={() => openDeleteConfirmation(user._id)}>
                            <RiDeleteBin6Line />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        : null}

      {/* Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleDelete}>Yes</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={() => setShowDeleteConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
