"use client";

import Flow from "@/components/Flow";
import React, { useState } from "react";

const fieldTypes = ["String", "Number", "ObjectId", "Date"];

const DatabaseSchemaVisualizer = () => {
  const [schemaArray, setSchemaArray] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("String");
  const [newFieldRef, setNewFieldRef] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTableIndex, setEditTableIndex] = useState(null);
  const [editFieldIndex, setEditFieldIndex] = useState(null);
  const [updatedFieldName, setUpdatedFieldName] = useState("");
  const [updatedFieldType, setUpdatedFieldType] = useState("String");
  const [updatedFieldRef, setUpdatedFieldRef] = useState("");

  const handleAddField = () => {
    if (newFieldName) {
      const updatedSchemaArray = [...schemaArray];
      if (selectedTableIndex !== null) {
        updatedSchemaArray[selectedTableIndex].fields.push({
          name: newFieldName,
          type: newFieldType,
          ref: newFieldType === "ObjectId" ? newFieldRef : null,
        });
        setSchemaArray(updatedSchemaArray);
        setNewFieldName("");
        setNewFieldType("String");
        setNewFieldRef("");
      }
    }
  };

  const handleAddTable = () => {
    if (newTableName) {
      setSchemaArray([
        ...schemaArray,
        {
          name: newTableName,
          fields: [],
        },
      ]);
      setNewTableName("");
      setSelectedTableIndex(schemaArray.length);
    }
  };

  const handleSelectTable = (index) => {
    setSelectedTableIndex(index);
  };

  const handleEditTable = (index) => {
    setEditMode(true);
    setEditTableIndex(index);
  };

  const handleDeleteTable = (index) => {
    if (index !== null) {
      const updatedSchemaArray = schemaArray.filter((_, i) => i !== index);
      setSchemaArray(updatedSchemaArray);
      setSelectedTableIndex(null);
      setEditMode(false);
    }
  };

  const handleUpdateField = () => {
    if (editTableIndex !== null && editFieldIndex !== null) {
      const updatedSchemaArray = [...schemaArray];
      updatedSchemaArray[editTableIndex].fields[editFieldIndex] = {
        name: updatedFieldName,
        type: updatedFieldType,
        ref: updatedFieldType === "ObjectId" ? updatedFieldRef : null,
      };
      setSchemaArray(updatedSchemaArray);
      setEditMode(false);
      setEditFieldIndex(null);
      setUpdatedFieldName("");
      setUpdatedFieldType("String");
      setUpdatedFieldRef("");
    }
  };

  return (
    <div className="grid grid-cols-12 bg-gray-900 text-white min-h-screen p-4">
      <div className="col-span-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Table</h3>
        <input
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
          type="text"
          placeholder="Table Name"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />
        <button
          onClick={handleAddTable}
          className="w-full py-2 mb-4 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
        >
          Add Table
        </button>

        <button
          onClick={() => setEditMode(!editMode)}
          className="w-full py-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
        >
          {editMode ? "Cancel Edit" : "Edit Table"}
        </button>

        {editMode && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Table to Edit</h3>
            <select
              className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
              value={editTableIndex !== null ? editTableIndex : ""}
              onChange={(e) => setEditTableIndex(parseInt(e.target.value))}
            >
              <option value="" disabled>Select a table</option>
              {schemaArray.map((schema, index) => (
                <option key={index} value={index}>
                  {schema.name}
                </option>
              ))}
            </select>

            {editTableIndex !== null && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Select Field to Edit</h4>
                <select
                  className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                  value={editFieldIndex !== null ? editFieldIndex : ""}
                  onChange={(e) => setEditFieldIndex(parseInt(e.target.value))}
                >
                  <option value="" disabled>Select a field</option>
                  {schemaArray[editTableIndex].fields.map((field, index) => (
                    <option key={index} value={index}>
                      {field.name}
                    </option>
                  ))}
                </select>

                {editFieldIndex !== null && (
                  <div>
                    <label className="block mb-1" htmlFor="updatedFieldName">
                      Field Name
                    </label>
                    <input
                      id="updatedFieldName"
                      className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                      type="text"
                      placeholder="Field Name"
                      value={updatedFieldName}
                      onChange={(e) => setUpdatedFieldName(e.target.value)}
                    />
                    <div className="mb-4">
                      <label className="block mb-1" htmlFor="updatedFieldType">
                        Field Type
                      </label>
                      <select
                        id="updatedFieldType"
                        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
                        value={updatedFieldType}
                        onChange={(e) => setUpdatedFieldType(e.target.value)}
                      >
                        {fieldTypes.map((field) => (
                          <option key={field} value={field}>
                            {field}
                          </option>
                        ))}
                      </select>
                    </div>
                    {updatedFieldType === "ObjectId" && (
                      <div className="mb-4">
                        <label className="block mb-1" htmlFor="updatedFieldRef">
                          Reference Table
                        </label>
                        <input
                          id="updatedFieldRef"
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          type="text"
                          placeholder="Reference Table"
                          value={updatedFieldRef}
                          onChange={(e) => setUpdatedFieldRef(e.target.value)}
                        />
                      </div>
                    )}
                    <button
                      onClick={handleUpdateField}
                      className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-semibold"
                    >
                      Update Field
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <h3 className="text-lg font-semibold mt-8 mb-4">Delete Table</h3>
        <select
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
          value={selectedTableIndex !== null ? selectedTableIndex : ""}
          onChange={(e) => setSelectedTableIndex(parseInt(e.target.value))}
        >
          <option value="" disabled>Select a table to delete</option>
          {schemaArray.map((schema, index) => (
            <option key={index} value={index}>
              {schema.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleDeleteTable(selectedTableIndex)}
          className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold"
          disabled={selectedTableIndex === null}
        >
          Delete Table
        </button>

        {selectedTableIndex !== null && !editMode && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Add New Field to {schemaArray[selectedTableIndex].name}
            </h3>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="newFieldName">
                Field Name
              </label>
              <input
                id="newFieldName"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                type="text"
                placeholder="Field Name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="newFieldType">
                Field Type
              </label>
              <select
                id="newFieldType"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
              >
                {fieldTypes.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            {newFieldType === "ObjectId" && (
              <div className="mb-4">
                <label className="block mb-1" htmlFor="newFieldRef">
                  Reference Table
                </label>
                <input
                  id="newFieldRef"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  type="text"
                  placeholder="Reference Table"
                  value={newFieldRef}
                  onChange={(e) => setNewFieldRef(e.target.value)}
                />
              </div>
            )}
            <button
              onClick={handleAddField}
              className="w-full py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
            >
              Add Field
            </button>
          </div>
        )}
      </div>
      <div className="col-span-8 p-4">
        <Flow schemaData={schemaArray} />
      </div>
    </div>
  );
};

export default DatabaseSchemaVisualizer;
