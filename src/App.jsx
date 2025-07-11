import React, { useState } from 'react';

// Main App component
const App = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    buildingType: '', // New field: Building Type
    numLeanTos: 0, // New field: Number of Lean-tos for complex type
    leanTos: [], // Array to hold data for each Lean-to
    width: '',
    length: '',
    eaveHeight: '',
    isEnclosed: '', // New field: Open or Enclosed for main building
    wantsWainscoting: '', // New field: Does user want wainscoting? for main building
    wainscotingHeight: '', // New field: Wainscoting height for main building
    roofStyle: '',
    otherRoofStyle: '',
    wantsPostAnchors: '', // New field: Does user want post anchors?
    postAnchorType: '',
    numOverheadDoors: 0, // For main building
    overheadDoorSizes: '', // For main building
    needsAutoOpeners: '', // For main building
    numWalkinDoors: 0, // For main building
    walkinDoorStyles: '', // For main building
    numWindows: 0, // For main building
    windowSizesStyles: '', // For main building
    buildingLocation: '',
    siteAccessible: '',
    additionalNotes: '',
  });

  // Handle main form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      let newState = {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };

      // Special handling for buildingType to reset leanTos if not complex
      if (name === 'buildingType' && value !== 'Gable with Lean-to(s)') {
        newState.numLeanTos = 0;
        newState.leanTos = [];
      } else if (name === 'numLeanTos') {
        const newNumLeanTos = parseInt(value, 10) || 0;
        // Initialize or trim leanTos array based on newNumLeanTos
        const updatedLeanTos = Array.from({ length: newNumLeanTos }, (_, i) => {
          return prevData.leanTos[i] || {
            width: '',
            length: '',
            eaveHeight: '',
            isEnclosed: '',
            wantsWainscoting: '',
            wainscotingHeight: '',
            numOverheadDoors: 0,
            overheadDoorSizes: '',
            needsAutoOpeners: '',
            numWalkinDoors: 0,
            walkinDoorStyles: '',
            numWindows: 0,
            windowSizesStyles: '',
          };
        });
        newState.leanTos = updatedLeanTos;
      }
      return newState;
    });
  };

  // Handle changes for specific Lean-to fields
  const handleLeanToChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      const updatedLeanTos = [...prevData.leanTos];
      updatedLeanTos[index] = {
        ...updatedLeanTos[index],
        [name]: type === 'checkbox' ? checked : value,
      };
      return {
        ...prevData,
        leanTos: updatedLeanTos,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would send this data to a backend or CRM
    alert('Form submitted successfully! Check the console for data.');
  };

  // Common Tailwind classes for custom radio buttons
  const radioClasses = "appearance-none w-5 h-5 rounded-md border border-gray-300 checked:bg-blue-600 checked:border-transparent checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 transition duration-150 ease-in-out cursor-pointer";
  const radioLabelClasses = "ml-2 text-gray-700 cursor-pointer";


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-3xl border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Pole Barn Quote Request</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* New field: Building Type */}
          <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t border-gray-200">Building Type</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What type of pole barn building are you interested in?</label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="buildingType"
                  value="Gable"
                  checked={formData.buildingType === 'Gable'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Gable</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="buildingType"
                  value="Lean-to"
                  checked={formData.buildingType === 'Lean-to'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Lean-to</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="buildingType"
                  value="Freestanding Lean-to"
                  checked={formData.buildingType === 'Freestanding Lean-to'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Freestanding Lean-to</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="buildingType"
                  value="Gable with Lean-to(s)"
                  checked={formData.buildingType === 'Gable with Lean-to(s)'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Gable with Lean-to(s)</span>
              </label>
            </div>
          </div>

          {/* Conditional: Number of Lean-tos for Complex building type */}
          {formData.buildingType === 'Gable with Lean-to(s)' && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <label htmlFor="numLeanTos" className="block text-sm font-medium text-gray-700 mb-1">How many Lean-tos do you need? (Max 4)</label>
              <input
                type="number"
                id="numLeanTos"
                name="numLeanTos"
                value={formData.numLeanTos}
                onChange={handleChange}
                min="0"
                max="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Project Basics (Main Building) */}
          <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t border-gray-200">Main Building Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Desired Truss Width (ft)</label>
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Desired Pole Barn Length (ft)</label>
              <input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="eaveHeight" className="block text-sm font-medium text-gray-700 mb-1">Desired Pole Barn Eave Height (ft)</label>
              <input
                type="number"
                id="eaveHeight"
                name="eaveHeight"
                value={formData.eaveHeight}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Main Building Enclosure & Wainscoting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Do you want the main pole barn open or enclosed?</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isEnclosed"
                  value="Open"
                  checked={formData.isEnclosed === 'Open'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Open</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isEnclosed"
                  value="Enclosed"
                  checked={formData.isEnclosed === 'Enclosed'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Enclosed</span>
              </label>
            </div>

            {/* Conditional wainscoting fields for main building */}
            {formData.isEnclosed === 'Enclosed' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Do you want wainscoting for the main building?</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wantsWainscoting"
                        value="Yes"
                        checked={formData.wantsWainscoting === 'Yes'}
                        onChange={handleChange}
                        className={radioClasses} // Apply custom classes
                      />
                      <span className={radioLabelClasses}>Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wantsWainscoting"
                        value="No"
                        checked={formData.wantsWainscoting === 'No'}
                        onChange={handleChange}
                        className={radioClasses} // Apply custom classes
                      />
                      <span className={radioLabelClasses}>No</span>
                    </label>
                  </div>
                </div>
                {formData.wantsWainscoting === 'Yes' && (
                  <div>
                    <label htmlFor="wainscotingHeight" className="block text-sm font-medium text-gray-700 mb-1">Wainscoting Height (ft) for Main Building</label>
                    <input
                      type="number"
                      id="wainscotingHeight"
                      name="wainscotingHeight"
                      value={formData.wainscotingHeight}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Lean-to Sections */}
          {formData.buildingType === 'Gable with Lean-to(s)' && formData.numLeanTos > 0 && (
            <>
              {[...Array(parseInt(formData.numLeanTos))].map((_, index) => (
                <div key={index} className="mt-8 pt-6 border-t border-gray-300 bg-blue-50 p-6 rounded-lg shadow-inner">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Lean-to {index + 1} Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label htmlFor={`leanToWidth-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Desired Lean-to Width (ft)</label>
                      <input
                        type="number"
                        id={`leanToWidth-${index}`}
                        name="width"
                        value={formData.leanTos[index]?.width || ''}
                        onChange={(e) => handleLeanToChange(index, e)}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`leanToLength-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Desired Lean-to Length (ft)</label>
                      <input
                        type="number"
                        id={`leanToLength-${index}`}
                        name="length"
                        value={formData.leanTos[index]?.length || ''}
                        onChange={(e) => handleLeanToChange(index, e)}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`leanToEaveHeight-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Desired Lean-to Eave Height (ft)</label>
                      <input
                        type="number"
                        id={`leanToEaveHeight-${index}`}
                        name="eaveHeight"
                        value={formData.leanTos[index]?.eaveHeight || ''}
                        onChange={(e) => handleLeanToChange(index, e)}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Lean-to Enclosure & Wainscoting */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Do you want this Lean-to open or enclosed?</label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="isEnclosed"
                          value="Open"
                          checked={formData.leanTos[index]?.isEnclosed === 'Open'}
                          onChange={(e) => handleLeanToChange(index, e)}
                          className={radioClasses} // Apply custom classes
                        />
                        <span className={radioLabelClasses}>Open</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="isEnclosed"
                          value="Enclosed"
                          checked={formData.leanTos[index]?.isEnclosed === 'Enclosed'}
                          onChange={(e) => handleLeanToChange(index, e)}
                          className={radioClasses} // Apply custom classes
                        />
                        <span className={radioLabelClasses}>Enclosed</span>
                      </label>
                    </div>

                    {formData.leanTos[index]?.isEnclosed === 'Enclosed' && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Do you want wainscoting for this Lean-to?</label>
                          <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="wantsWainscoting"
                                value="Yes"
                                checked={formData.leanTos[index]?.wantsWainscoting === 'Yes'}
                                onChange={(e) => handleLeanToChange(index, e)}
                                className={radioClasses} // Apply custom classes
                              />
                              <span className={radioLabelClasses}>Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="wantsWainscoting"
                                value="No"
                                checked={formData.leanTos[index]?.wantsWainscoting === 'No'}
                                onChange={(e) => handleLeanToChange(index, e)}
                                className={radioClasses} // Apply custom classes
                              />
                              <span className={radioLabelClasses}>No</span>
                            </label>
                          </div>
                        </div>
                        {formData.leanTos[index]?.wantsWainscoting === 'Yes' && (
                          <div>
                            <label htmlFor={`leanToWainscotingHeight-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Wainscoting Height (ft) for this Lean-to</label>
                            <input
                              type="number"
                              id={`leanToWainscotingHeight-${index}`}
                              name="wainscotingHeight"
                              value={formData.leanTos[index]?.wainscotingHeight || ''}
                              onChange={(e) => handleLeanToChange(index, e)}
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Lean-to Doors and Windows */}
                  <div className="mb-6">
                    <label htmlFor={`leanToNumOverheadDoors-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Number of Overhead Doors for this Lean-to</label>
                    <input
                      type="number"
                      id={`leanToNumOverheadDoors-${index}`}
                      name="numOverheadDoors"
                      value={formData.leanTos[index]?.numOverheadDoors || 0}
                      onChange={(e) => handleLeanToChange(index, e)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {parseInt(formData.leanTos[index]?.numOverheadDoors) > 0 && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor={`leanToOverheadDoorSizes-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Desired Overhead Door Sizes (e.g., 10x10, 12x14) for this Lean-to</label>
                          <textarea
                            id={`leanToOverheadDoorSizes-${index}`}
                            name="overheadDoorSizes"
                            value={formData.leanTos[index]?.overheadDoorSizes || ''}
                            onChange={(e) => handleLeanToChange(index, e)}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Do you need automatic openers for overhead doors for this Lean-to?</label>
                          <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="needsAutoOpeners"
                                value="Yes"
                                checked={formData.leanTos[index]?.needsAutoOpeners === 'Yes'}
                                onChange={(e) => handleLeanToChange(index, e)}
                                className={radioClasses} // Apply custom classes
                              />
                              <span className={radioLabelClasses}>Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="needsAutoOpeners"
                                value="No"
                                checked={formData.leanTos[index]?.needsAutoOpeners === 'No'}
                                onChange={(e) => handleLeanToChange(index, e)}
                                className={radioClasses} // Apply custom classes
                              />
                              <span className={radioLabelClasses}>No</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`leanToNumWalkinDoors-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Number of Walk-in Doors for this Lean-to</label>
                    <input
                      type="number"
                      id={`leanToNumWalkinDoors-${index}`}
                      name="numWalkinDoors"
                      value={formData.leanTos[index]?.numWalkinDoors || 0}
                      onChange={(e) => handleLeanToChange(index, e)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {parseInt(formData.leanTos[index]?.numWalkinDoors) > 0 && (
                      <div className="mt-4">
                        <label htmlFor={`leanToWalkinDoorStyles-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Desired Walk-in Door Styles (e.g., standard, commercial, glass) for this Lean-to</label>
                        <input
                          type="text"
                          id={`leanToWalkinDoorStyles-${index}`}
                          name="walkinDoorStyles"
                          value={formData.leanTos[index]?.walkinDoorStyles || ''}
                          onChange={(e) => handleLeanToChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`leanToNumWindows-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Number of Windows for this Lean-to</label>
                    <input
                      type="number"
                      id={`leanToNumWindows-${index}`}
                      name="numWindows"
                      value={formData.leanTos[index]?.numWindows || 0}
                      onChange={(e) => handleLeanToChange(index, e)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {parseInt(formData.leanTos[index]?.numWindows) > 0 && (
                      <div className="mt-4">
                        <label htmlFor={`leanToWindowSizesStyles-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Desired Window Sizes and Styles for this Lean-to</label>
                        <textarea
                          id={`leanToWindowSizesStyles-${index}`}
                          name="windowSizesStyles"
                          value={formData.leanTos[index]?.windowSizesStyles || ''}
                          onChange={(e) => handleLeanToChange(index, e)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Structural Details (Main Building) */}
          <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t border-gray-200">Structural Details</h2>
          <div>
            <label htmlFor="roofStyle" className="block text-sm font-medium text-gray-700 mb-1">Roof Style (for Main Building)</label>
            <select
              id="roofStyle"
              name="roofStyle"
              value={formData.roofStyle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an option</option>
              <option value="Gable">Gable</option>
              <option value="Lean-to">Lean-to</option>
              <option value="Monitor">Monitor</option>
              <option value="Other">Other</option>
            </select>
            {formData.roofStyle === 'Other' && (
              <div className="mt-4">
                <label htmlFor="otherRoofStyle" className="block text-sm font-medium text-gray-700 mb-1">Please specify roof style</label>
                <input
                  type="text"
                  id="otherRoofStyle"
                  name="otherRoofStyle"
                  value={formData.otherRoofStyle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Post Anchors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Do you want post anchors?</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wantsPostAnchors"
                  value="Yes"
                  checked={formData.wantsPostAnchors === 'Yes'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wantsPostAnchors"
                  value="No"
                  checked={formData.wantsPostAnchors === 'No'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>No</span>
              </label>
            </div>
            {formData.wantsPostAnchors === 'Yes' && (
              <div className="mt-4">
                <label htmlFor="postAnchorType" className="block text-sm font-medium text-gray-700 mb-1">Select desired post anchor type</label>
                <select
                  id="postAnchorType"
                  name="postAnchorType"
                  value={formData.postAnchorType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="Wet Set">Wet Set</option>
                  <option value="Drill Set">Drill Set</option>
                  <option value="Uplift Brackets">Uplift Brackets</option>
                </select>
              </div>
            )}
          </div>

          {/* Main Building Doors and Windows */}
          <div>
            <label htmlFor="numOverheadDoors" className="block text-sm font-medium text-gray-700 mb-1">Number of Overhead Doors (for Main Building)</label>
            <input
              type="number"
              id="numOverheadDoors"
              name="numOverheadDoors"
              value={formData.numOverheadDoors}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {parseInt(formData.numOverheadDoors) > 0 && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="overheadDoorSizes" className="block text-sm font-medium text-gray-700 mb-1">Desired Overhead Door Sizes (e.g., 10x10, 12x14) for Main Building</label>
                  <textarea
                    id="overheadDoorSizes"
                    name="overheadDoorSizes"
                    value={formData.overheadDoorSizes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Do you need automatic openers for overhead doors for Main Building?</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="needsAutoOpeners"
                        value="Yes"
                        checked={formData.needsAutoOpeners === 'Yes'}
                        onChange={handleChange}
                        className={radioClasses} // Apply custom classes
                      />
                      <span className={radioLabelClasses}>Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="needsAutoOpeners"
                        value="No"
                        checked={formData.needsAutoOpeners === 'No'}
                        onChange={handleChange}
                        className={radioClasses} // Apply custom classes
                      />
                      <span className={radioLabelClasses}>No</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="numWalkinDoors" className="block text-sm font-medium text-gray-700 mb-1">Number of Walk-in Doors (for Main Building)</label>
            <input
              type="number"
              id="numWalkinDoors"
              name="numWalkinDoors"
              value={formData.numWalkinDoors}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {parseInt(formData.numWalkinDoors) > 0 && (
              <div className="mt-4">
                <label htmlFor="walkinDoorStyles" className="block text-sm font-medium text-gray-700 mb-1">Desired Walk-in Door Styles (e.g., standard, commercial, glass) for Main Building</label>
                <input
                  type="text"
                  id="walkinDoorStyles"
                  name="walkinDoorStyles"
                  value={formData.walkinDoorStyles}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="numWindows" className="block text-sm font-medium text-gray-700 mb-1">Number of Windows (for Main Building)</label>
            <input
              type="number"
              id="numWindows"
              name="numWindows"
              value={formData.numWindows}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {parseInt(formData.numWindows) > 0 && (
              <div className="mt-4">
                <label htmlFor="windowSizesStyles" className="block text-sm font-medium text-gray-700 mb-1">Desired Window Sizes and Styles for Main Building</label>
                <textarea
                  id="windowSizesStyles"
                  name="windowSizesStyles"
                  value={formData.windowSizesStyles}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            )}
          </div>

          {/* Site Information */}
          <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t border-gray-200">Site Information</h2>
          <div>
            <label htmlFor="buildingLocation" className="block text-sm font-medium text-gray-700 mb-1">Building Location (City, State, Zip Code)</label>
            <input
              type="text"
              id="buildingLocation"
              name="buildingLocation"
              value={formData.buildingLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Is the building site accessible for large equipment?</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="siteAccessible"
                  value="Yes"
                  checked={formData.siteAccessible === 'Yes'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="siteAccessible"
                  value="No"
                  checked={formData.siteAccessible === 'No'}
                  onChange={handleChange}
                  className={radioClasses} // Apply custom classes
                />
                <span className={radioLabelClasses}>No</span>
              </label>
            </div>
          </div>

          {/* Additional Information */}
          <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t border-gray-200">Additional Information</h2>
          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">Any additional notes or specific requirements?</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Submit Quote Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
