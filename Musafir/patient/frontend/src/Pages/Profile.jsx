import React, { useState } from 'react';

const Profile = () => {
  // State management for all sections
  const [sections, setSections] = useState({
    personal: {
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      editMode: false
    },
    medical: {
      diagnoses: ['Hypertension', 'Type 2 Diabetes'],
      medications: ['Metformin 500mg', 'Amlodipine 5mg'],
      allergies: ['Penicillin'],
      editMode: false
    },
    insurance: {
      policies: [
        { id: 1, name: 'Ayushman Bharat', number: 'AB123456' },
        { id: 2, name: 'Private Health Insurance', number: 'PHI789012' }
      ],
      editMode: false
    },
    preferences: {
      preferredClinics: ['City Hospital', 'Community Health Center'],
      preferredDoctors: ['Dr. Sharma', 'Dr. Gupta'],
      preferredPharmacies: ['MedLife Pharmacy', '24x7 Meds'],
      editMode: false
    }
  });

  // Universal update functions
  const updateField = (section, field, value) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const toggleEdit = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], editMode: !prev[section].editMode }
    }));
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Health Profile</h1>
      <div className="space-y-4">
        {/* Personal Details Section */}
        <SectionTemplate
          title="Personal Details"
          section="personal"
          state={sections.personal}
          toggleEdit={toggleEdit}
        >
          {sections.personal.editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Name" value={sections.personal.name} 
                onChange={(e) => updateField('personal', 'name', e.target.value)} />
              <InputField label="Age" type="number" value={sections.personal.age} 
                onChange={(e) => updateField('personal', 'age', e.target.value)} />
              <SelectField label="Gender" value={sections.personal.gender}
                options={['Male', 'Female', 'Other']}
                onChange={(e) => updateField('personal', 'gender', e.target.value)} />
              <InputField label="Email" type="email" value={sections.personal.email} 
                onChange={(e) => updateField('personal', 'email', e.target.value)} />
              <InputField label="Phone" value={sections.personal.phone} 
                onChange={(e) => updateField('personal', 'phone', e.target.value)} />
            </div>
          ) : (
            <div className="space-y-3">
              <DetailItem label="Name" value={sections.personal.name} />
              <DetailItem label="Age" value={sections.personal.age} />
              <DetailItem label="Gender" value={sections.personal.gender} />
              <DetailItem label="Email" value={sections.personal.email} />
              <DetailItem label="Phone" value={sections.personal.phone} />
            </div>
          )}
        </SectionTemplate>

        {/* Medical History Section */}
        <SectionTemplate
          title="Medical History"
          section="medical"
          state={sections.medical}
          toggleEdit={toggleEdit}
        >
          {sections.medical.editMode ? (
            <div className="space-y-4">
              <ListManager
                label="Diagnoses"
                items={sections.medical.diagnoses}
                onUpdate={(items) => updateField('medical', 'diagnoses', items)}
              />
              <ListManager
                label="Medications"
                items={sections.medical.medications}
                onUpdate={(items) => updateField('medical', 'medications', items)}
              />
              <ListManager
                label="Allergies"
                items={sections.medical.allergies}
                onUpdate={(items) => updateField('medical', 'allergies', items)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <DetailList label="Diagnoses" items={sections.medical.diagnoses} />
              <DetailList label="Medications" items={sections.medical.medications} />
              <DetailList label="Allergies" items={sections.medical.allergies} />
            </div>
          )}
        </SectionTemplate>

        {/* Insurance Section */}
        <SectionTemplate
          title="Insurance & Government Schemes"
          section="insurance"
          state={sections.insurance}
          toggleEdit={toggleEdit}
        >
          {sections.insurance.editMode ? (
            <PolicyManager
              policies={sections.insurance.policies}
              onUpdate={(policies) => updateField('insurance', 'policies', policies)}
            />
          ) : (
            <div className="space-y-2">
              {sections.insurance.policies.map(policy => (
                <div key={policy.id} className="p-3 bg-gray-50 rounded">
                  <p className="font-medium">{policy.name}</p>
                  <p className="text-gray-600">{policy.number}</p>
                </div>
              ))}
            </div>
          )}
        </SectionTemplate>

        {/* Preferences Section */}
        <SectionTemplate
          title="Preferences"
          section="preferences"
          state={sections.preferences}
          toggleEdit={toggleEdit}
        >
          {sections.preferences.editMode ? (
            <div className="space-y-4">
              <ListManager
                label="Preferred Clinics"
                items={sections.preferences.preferredClinics}
                onUpdate={(items) => updateField('preferences', 'preferredClinics', items)}
              />
              <ListManager
                label="Preferred Doctors"
                items={sections.preferences.preferredDoctors}
                onUpdate={(items) => updateField('preferences', 'preferredDoctors', items)}
              />
              <ListManager
                label="Preferred Pharmacies"
                items={sections.preferences.preferredPharmacies}
                onUpdate={(items) => updateField('preferences', 'preferredPharmacies', items)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <DetailList label="Preferred Clinics" items={sections.preferences.preferredClinics} />
              <DetailList label="Preferred Doctors" items={sections.preferences.preferredDoctors} />
              <DetailList label="Preferred Pharmacies" items={sections.preferences.preferredPharmacies} />
            </div>
          )}
        </SectionTemplate>
      </div>
    </div>
  );
};

// Reusable Components
const SectionTemplate = ({ title, section, state, toggleEdit, children }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
      <button
        onClick={() => toggleEdit(section)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
      >
        {state.editMode ? 'Save Changes' : 'Edit Section'}
      </button>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SelectField = ({ label, value, options, onChange }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
    <span className="font-medium text-gray-700 md:w-1/3">{label}</span>
    <span className="text-gray-600 md:w-2/3 mt-1 md:mt-0">{value}</span>
  </div>
);

const DetailList = ({ label, items }) => (
  <div>
    <h3 className="font-medium text-gray-700 mb-2">{label}</h3>
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-gray-600">{item}</li>
      ))}
    </ul>
  </div>
);

const ListManager = ({ label, items, onUpdate }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-700">{label}</h3>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border rounded-lg p-2 flex-grow"
          placeholder={`Add ${label.toLowerCase()}`}
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 whitespace-nowrap"
        >
          Add New
        </button>
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span className="flex-grow">{item}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PolicyManager = ({ policies, onUpdate }) => {
  const [newPolicy, setNewPolicy] = useState({ name: '', number: '' });

  const handleAdd = () => {
    if (newPolicy.name.trim() && newPolicy.number.trim()) {
      onUpdate([...policies, { ...newPolicy, id: Date.now() }]);
      setNewPolicy({ name: '', number: '' });
    }
  };

  const handleRemove = (id) => {
    onUpdate(policies.filter(policy => policy.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Policy Name"
          value={newPolicy.name}
          onChange={(e) => setNewPolicy(p => ({ ...p, name: e.target.value }))}
          className="border rounded-lg p-2 flex-grow"
        />
        <input
          type="text"
          placeholder="Policy Number"
          value={newPolicy.number}
          onChange={(e) => setNewPolicy(p => ({ ...p, number: e.target.value }))}
          className="border rounded-lg p-2 flex-grow"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 whitespace-nowrap"
        >
          Add Policy
        </button>
      </div>
      <div className="space-y-2">
        {policies.map(policy => (
          <div key={policy.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
            <div className="flex-grow">
              <p className="font-medium">{policy.name}</p>
              <p className="text-gray-600">{policy.number}</p>
            </div>
            <button
              onClick={() => handleRemove(policy.id)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;