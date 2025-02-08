import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Pencil, Save } from "lucide-react"; // Importing icons

interface Profile {
  profileId: string;
  name: string;
  email: string;
  residenceType: "rural" | "urban";
  annualIncome: number;
  age: number;
  numberOfDependants: number;
}

const ProfilePage = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>({
    profileId: "",
    name: "",
    email: "",
    residenceType: "rural",
    annualIncome: 0,
    age: 0,
    numberOfDependants: 0,
  });

  const profileId = localStorage.getItem("profileId");
  console.log(profileId);
  if (!profileId) {
    console.error("Profile ID is missing!");
    window.location.href = "/login";
    return;
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/${profileId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${profileId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{t("profile.title")}</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                {t("profile.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder={t("profile.name")}
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">
                {t("profile.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder={t("profile.email")}
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Residence Type */}
            <div>
              <label htmlFor="residenceType" className="block font-medium text-gray-700">
                {t("profile.residenceType")}
              </label>
              <select
                id="residenceType"
                name="residenceType"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                value={formData.residenceType}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="urban">{t("profile.urban")}</option>
                <option value="rural">{t("profile.rural")}</option>
              </select>
            </div>

            {/* Annual Income */}
            <div>
              <label htmlFor="annualIncome" className="block font-medium text-gray-700">
                {t("profile.annualIncome")}
              </label>
              <input
                id="annualIncome"
                name="annualIncome"
                type="number"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder={t("profile.annualIncome")}
                value={formData.annualIncome}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block font-medium text-gray-700">
                {t("profile.age")}
              </label>
              <input
                id="age"
                name="age"
                type="number"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder={t("profile.age")}
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Number of Dependants */}
            <div>
              <label htmlFor="numberOfDependants" className="block font-medium text-gray-700">
                {t("profile.numberOfDependants")}
              </label>
              <input
                id="numberOfDependants"
                name="numberOfDependants"
                type="number"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder={t("profile.numberOfDependants")}
                value={formData.numberOfDependants}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Edit and Save Buttons */}
          <div className="flex justify-between">
            {/* Edit Button */}
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isEditing} // Disable when already in edit mode
            >
              <Pencil size={18} />
              {t("button.edit")}
            </button>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              disabled={!isEditing} // Disable when not in edit mode
            >
              <Save size={18} />
              {t("button.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
