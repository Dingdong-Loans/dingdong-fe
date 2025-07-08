import React, { useState } from "react";

interface AppPolicyProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const AppPolicy: React.FC<AppPolicyProps> = ({
  isOpen,
  onAccept,
  onDecline,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleAccept = () => {
    if (termsAccepted && privacyAccepted) {
      onAccept();
    }
  };

  const isAcceptEnabled = termsAccepted && privacyAccepted;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Terms and Privacy Agreement
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Before proceeding, please review and accept our policies:
          </p>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Privacy Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="privacy"
              className="text-sm text-gray-700 leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Data Privacy Policy
              </a>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onDecline}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            disabled={!isAcceptEnabled}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              isAcceptEnabled
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppPolicy;
