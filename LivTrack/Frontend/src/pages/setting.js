import React from "react";
import "../styles/setting.css";
import {
  FaUser,
  FaLock,
  FaBell,
  FaQuestionCircle,
  FaClipboardList,
  FaExclamationTriangle,
  FaCommentDots,
} from "react-icons/fa";

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Account Section */}
      <div className="settings-section">
        <h3>Account</h3>
        <button className="settings-btn">
          <FaUser /> Edit Profile
        </button>
        <button className="settings-btn">
          <FaLock /> Security
        </button>
        <button className="settings-btn">
          <FaBell /> Notifications
        </button>
      </div>

      {/* Support & About Section */}
      <div className="settings-section">
        <h3>Support & About</h3>
        <button className="settings-btn">
          <FaQuestionCircle /> Help & Support
        </button>
        <button className="settings-btn">
          <FaClipboardList /> Terms & Policy
        </button>
        <button className="settings-btn">
          <FaExclamationTriangle /> Report a Problem
        </button>
        <button className="settings-btn">
          <FaCommentDots /> Feedback
        </button>
      </div>
    </div>
  );
};

export default Settings;
