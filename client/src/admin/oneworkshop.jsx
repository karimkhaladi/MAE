import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaCirclePlus } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Oneworkshop() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    axios.get(`/api/allcours/${id}`)
      .then((res) => setWorkshop(res.data))
      .catch((err) => console.log(err));
  }, [workshop]);

  const handleDelete = () => {
    if (courseToDelete) {
      axios.delete(`/api/delete/cour/${courseToDelete}/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setWorkshop(prevWorkshop => ({
        ...prevWorkshop,
        cours: prevWorkshop.cours.filter(cour => cour._id !== courseToDelete)
      }));
    }
    setShowDeleteConfirmation(false);
    setCourseToDelete(null);
  };

  const openDeleteConfirmation = (courseId) => {
    setShowDeleteConfirmation(true);
    setCourseToDelete(courseId);
  };

  return (
    <>
      {workshop ?
        <div>
          <section className="antialiased mt-20 px-4">
            <div className="flex flex-col justify-center h-full">
              <div className="w-80 md:w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <p className="text-xl p-5 font-bold">{workshop.workshop.titre} cours</p>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Titre</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Description</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Delete</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {workshop.cours.map((cour, index) => (
                          <tr key={index}>
                            <Link to={`/admin/cour/${cour._id}`}>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">{cour.titre}</div>
                                </div>
                              </td>
                            </Link>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">{cour.description}</div>
                              </div>
                            </td>
                            <td className="pl-10 text-xl" onClick={() => openDeleteConfirmation(cour._id)}>
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
            <Link to={`/admin/newcour/${id}`} className="mt-6 items-center flex gap-10 w-80 mx-auto select-none rounded-lg bg-[#168859] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 hover:shadow-lg">
              <FaCirclePlus size={25} />
              <p className="text-lg">Add Cour</p>
            </Link>
          </section>
        </div>
        : null}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this course?</p>
            <div className="flex justify-end">
            <button className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={handleDelete}>Yes</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={() => setShowDeleteConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Oneworkshop;
