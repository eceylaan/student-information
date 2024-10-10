"use client";
import { useState } from "react";
import { updateStudentVize } from "./actions"; // Assuming this is an async function that updates the database.

export default function Form({ students }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [note, setNote] = useState({ vize: 0, vize2: 0, final: 0 });

  const handleOpenDialog = (student) => {
    setSelectedStudent(student);
    setNote({ vize: student.vize, vize2: student.vize2, final: student.final });
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await updateStudentVize(formData);
      console.log("Vize updated successfully");
    } catch (error) {
      console.error("Error updating vize:", error);
    }

    setOpenDialog(false);
  };

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleOpenDialog(student)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update Vize
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Update Vize for {selectedStudent.name}</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="vize"
                value={note.vize}
                onChange={(e) => setNote({ ...note, vize: e.target.value })}
                type="number"
                placeholder="Enter vize note"
                className="border p-2 w-full mb-4"
              />
              <input
                name="vize2"
                value={note.vize2}
                onChange={(e) => setNote({ ...note, vize2: e.target.value })}
                type="number"
                placeholder="Enter vize2 note"
                className="border p-2 w-full mb-4"
              />
              <input
                name="final"
                value={note.final}
                onChange={(e) => setNote({ ...note, final: e.target.value })}
                type="number"
                placeholder="Enter final note"
                className="border p-2 w-full mb-4"
              />
              <input
                name="student_id"
                value={selectedStudent.id}
                type="hidden"
                placeholder="Enter final note"
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button type="button" onClick={() => setOpenDialog(false)} className="mr-4 px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
