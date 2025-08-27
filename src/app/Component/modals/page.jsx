"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Modal utama dengan peningkatan UI
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  closeOnOverlayClick = true,
  showCloseButton = true,
  variant = "default",
  className = "",
  blurOverlay = true,
  showOverlay = true,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-lg",
    large: "max-w-2xl",
    xlarge: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  const variantClasses = {
    default: darkMode
      ? "bg-gray-800 border border-gray-700 text-white"
      : "bg-white border border-gray-200 text-gray-900",
    primary: darkMode
      ? "bg-blue-900/30 backdrop-blur-md border border-blue-700/30 text-white"
      : "bg-blue-50/80 backdrop-blur-sm border border-blue-200 text-blue-900",
    danger: darkMode
      ? "bg-red-900/30 backdrop-blur-md border border-red-700/30 text-white"
      : "bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-900",
    success: darkMode
      ? "bg-green-900/30 backdrop-blur-md border border-green-700/30 text-white"
      : "bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-900",
    glass: darkMode
      ? "bg-gray-800/70 backdrop-blur-xl border border-gray-700/50 text-white"
      : "bg-white/80 backdrop-blur-xl border border-gray-200/50 text-gray-900",
  };

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 ${
                blurOverlay ? "backdrop-blur-sm" : ""
              } ${darkMode ? "bg-black/70" : "bg-black/50"}`}
              onClick={handleOverlayClick}
            />
          )}

          {/* Modal container */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full ${sizeClasses[size]} rounded-xl shadow-2xl ${variantClasses[variant]} ${className}`}
            >
              {/* Header */}
              {title && (
                <div
                  className={`px-6 py-4 border-b ${
                    darkMode
                      ? "border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-900/80"
                      : "border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100/80"
                  }`}
                >
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {title}
                  </h3>
                </div>
              )}

              {/* Close button */}
              {showCloseButton && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`absolute top-4 right-4 rounded-full p-2 transition-all ${
                    darkMode
                      ? "hover:bg-gray-700/50 text-gray-300"
                      : "hover:bg-gray-200/50 text-gray-500"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Komponen untuk contoh penggunaan modal
const ModalExample = ({ title, description, children, code, darkMode }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3
            className={`text-xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {description}
          </p>
        </div>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isCodeVisible
                    ? "M6 18L18 6M6 6l12 12"
                    : "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                }
              />
            </svg>
          }
        >
          {isCodeVisible ? "Hide Code" : "Show Code"}
        </Button>
      </div>

      <div className="mb-6">{children}</div>

      <AnimatePresence>
        {isCodeVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`rounded-xl p-4 ${
                darkMode
                  ? "bg-gray-900 text-gray-200"
                  : "bg-gray-100 text-gray-800"
              } overflow-x-auto mt-4`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Code</span>
                <CopyButton text={code} darkMode={darkMode} />
              </div>
              <pre className="text-sm font-mono">{code}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Komponen Button untuk trigger modal
const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon,
  loading,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const variantClasses = {
    primary: darkMode
      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
      : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30",
    secondary: darkMode
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-700",
    danger: darkMode
      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20"
      : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30",
    success: darkMode
      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
      : "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30",
    ghost: darkMode
      ? "hover:bg-gray-700/50 text-gray-300"
      : "hover:bg-gray-200/50 text-gray-600",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${variantClasses[variant]} ${className}`}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </motion.button>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children, darkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-lg transition-all ${
        active
          ? darkMode
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
      }`}
    >
      {children}
    </button>
  );
};

// Copy to Clipboard Button yang ditingkatkan
const CopyButton = ({ text, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={copyToClipboard}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
        darkMode
          ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      }`}
    >
      {copied ? (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </>
      )}
    </motion.button>
  );
};

export default function ModalsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk modal
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [noTitleModalOpen, setNoTitleModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [fullModalOpen, setFullModalOpen] = useState(false);
  const [glassModalOpen, setGlassModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter modals berdasarkan tab aktif
  const filteredModals = [
    {
      id: "basic",
      title: "Basic Modal",
      description: "A simple modal with title and content.",
      code: `const [isOpen, setIsOpen] = useState(false);\n\n<Button onClick={() => setIsOpen(true)}>\n  Open Basic Modal\n</Button>\n\n<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Basic Modal"\n>\n  <p className="${
        darkMode ? "text-gray-300" : "text-gray-600"
      } mb-4">\n    This is a basic modal example. You can put any content here.\n  </p>\n  <div className="flex justify-end space-x-2">\n    <Button variant="secondary" onClick={() => setIsOpen(false)}>\n      Cancel\n    </Button>\n    <Button onClick={() => setIsOpen(false)}>\n      Confirm\n    </Button>\n  </div>\n</Modal>`,
      content: (
        <div>
          <Button onClick={() => setBasicModalOpen(true)}>
            Open Basic Modal
          </Button>

          <Modal
            isOpen={basicModalOpen}
            onClose={() => setBasicModalOpen(false)}
            title="Basic Modal"
          >
            <p
              className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}
            >
              This is a basic modal example. You can put any content here.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setBasicModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setBasicModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </div>
      ),
      category: "basic",
    },
    {
      id: "sizes",
      title: "Modal Sizes",
      description:
        "Modals in different sizes: small, medium, large, and full width.",
      code: `const [largeModalOpen, setLargeModalOpen] = useState(false);\nconst [fullModalOpen, setFullModalOpen] = useState(false);\n\n<Button onClick={() => setLargeModalOpen(true)} className="mr-2">\n  Open Large Modal\n</Button>\n<Button onClick={() => setFullModalOpen(true)}>\n  Open Full Width Modal\n</Button>\n\n<Modal\n  isOpen={largeModalOpen}\n  onClose={() => setLargeModalOpen(false)}\n  title="Large Modal"\n  size="large"\n>\n  <p className="${
        darkMode ? "text-gray-300" : "text-gray-600"
      }">\n    This is a large modal. It has a wider maximum width than the default modal.\n  </p>\n</Modal>\n\n<Modal\n  isOpen={fullModalOpen}\n  onClose={() => setFullModalOpen(false)}\n  title="Full Width Modal"\n  size="full"\n>\n  <p className="${
        darkMode ? "text-gray-300" : "text-gray-600"
      }">\n    This modal spans the full width of the screen (with margins on mobile).\n  </p>\n</Modal>`,
      content: (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setLargeModalOpen(true)}>
            Open Large Modal
          </Button>
          <Button onClick={() => setFullModalOpen(true)}>
            Open Full Width Modal
          </Button>

          <Modal
            isOpen={largeModalOpen}
            onClose={() => setLargeModalOpen(false)}
            title="Large Modal"
            size="large"
          >
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              This is a large modal. It has a wider maximum width than the
              default modal.
            </p>
          </Modal>

          <Modal
            isOpen={fullModalOpen}
            onClose={() => setFullModalOpen(false)}
            title="Full Width Modal"
            size="full"
          >
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              This modal spans the full width of the screen (with margins on
              mobile).
            </p>
          </Modal>
        </div>
      ),
      category: "sizes",
    },
    {
      id: "variants",
      title: "Modal Variants",
      description: "Modals with different color variants.",
      code: `const [dangerModalOpen, setDangerModalOpen] = useState(false);\n\n<Button \n  onClick={() => setDangerModalOpen(true)}\n  variant="danger"\n>\n  Open Danger Modal\n</Button>\n\n<Modal\n  isOpen={dangerModalOpen}\n  onClose={() => setDangerModalOpen(false)}\n  title="Danger Action"\n  variant="danger"\n>\n  <p className="mb-4 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }">\n    This is a danger modal. Use it for destructive actions like deletions.\n  </p>\n  <div className="flex justify-end space-x-2">\n    <Button variant="secondary" onClick={() => setDangerModalOpen(false)}>\n      Cancel\n    </Button>\n    <Button variant="danger" onClick={() => setDangerModalOpen(false)}>\n      Delete\n    </Button>\n  </div>\n</Modal>`,
      content: (
        <div>
          <Button variant="danger" onClick={() => setDangerModalOpen(true)}>
            Open Danger Modal
          </Button>

          <Modal
            isOpen={dangerModalOpen}
            onClose={() => setDangerModalOpen(false)}
            title="Danger Action"
            variant="danger"
          >
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              This is a danger modal. Use it for destructive actions like
              deletions.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setDangerModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => setDangerModalOpen(false)}
              >
                Delete
              </Button>
            </div>
          </Modal>
        </div>
      ),
      category: "variants",
    },
    {
      id: "no-title",
      title: "Modal Without Title",
      description: "A modal without a title section.",
      code: `const [noTitleModalOpen, setNoTitleModalOpen] = useState(false);\n\n<Button onClick={() => setNoTitleModalOpen(true)}>\n  Open Modal Without Title\n</Button>\n\n<Modal\n  isOpen={noTitleModalOpen}\n  onClose={() => setNoTitleModalOpen(false)}\n  showCloseButton={true}\n>\n  <div className="text-center py-4">\n    <div className="w-16 h-16 ${
        darkMode ? "bg-green-800 text-green-300" : "bg-green-100 text-green-600"
      } rounded-full flex items-center justify-center mx-auto mb-4">\n      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />\n      </svg>\n    </div>\n    <h4 className="text-lg font-medium ${
        darkMode ? "text-white" : "text-gray-900"
      } mb-2">Success!</h4>\n    <p className="${
        darkMode ? "text-gray-300" : "text-gray-600"
      }">Your action has been completed successfully.</p>\n  </div>\n</Modal>`,
      content: (
        <div>
          <Button onClick={() => setNoTitleModalOpen(true)}>
            Open Modal Without Title
          </Button>

          <Modal
            isOpen={noTitleModalOpen}
            onClose={() => setNoTitleModalOpen(false)}
            showCloseButton={true}
          >
            <div className="text-center py-4">
              <div
                className={`w-16 h-16 ${
                  darkMode
                    ? "bg-green-800 text-green-300"
                    : "bg-green-100 text-green-600"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4
                className={`text-lg font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                Success!
              </h4>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Your action has been completed successfully.
              </p>
            </div>
          </Modal>
        </div>
      ),
      category: "styles",
    },
    {
      id: "custom",
      title: "Custom Content Modal",
      description: "A modal with custom content and layout.",
      code: `const [customModalOpen, setCustomModalOpen] = useState(false);\n\n<Button onClick={() => setCustomModalOpen(true)}>\n  Open Custom Modal\n</Button>\n\n<Modal\n  isOpen={customModalOpen}\n  onClose={() => setCustomModalOpen(false)}\n  title="User Profile"\n  size="medium"\n>\n  <div className="flex items-start space-x-4">\n    <div className="w-16 h-16 ${
        darkMode ? "bg-blue-800 text-blue-300" : "bg-blue-100 text-blue-600"
      } rounded-full flex items-center justify-center">\n      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n      </svg>\n    </div>\n    <div>\n      <h4 className="text-lg font-medium ${
        darkMode ? "text-white" : "text-gray-900"
      }">John Doe</h4>\n      <p className="${
        darkMode ? "text-gray-400" : "text-gray-500"
      }">john.doe@example.com</p>\n      <p className="mt-2 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }">This is an example of a modal with custom content layout.</p>\n    </div>\n  </div>\n  <div className="mt-6 flex justify-end">\n    <Button variant="secondary" onClick={() => setCustomModalOpen(false)} className="mr-2">\n      Close\n    </Button>\n    <Button onClick={() => setCustomModalOpen(false)}>\n      Save Changes\n    </Button>\n  </div>\n</Modal>`,
      content: (
        <div>
          <Button onClick={() => setCustomModalOpen(true)}>
            Open Custom Modal
          </Button>

          <Modal
            isOpen={customModalOpen}
            onClose={() => setCustomModalOpen(false)}
            title="User Profile"
            size="medium"
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-16 h-16 ${
                  darkMode
                    ? "bg-blue-800 text-blue-300"
                    : "bg-blue-100 text-blue-600"
                } rounded-full flex items-center justify-center`}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h4
                  className={`text-lg font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  John Doe
                </h4>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  john.doe@example.com
                </p>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  This is an example of a modal with custom content layout.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setCustomModalOpen(false)}
                className="mr-2"
              >
                Close
              </Button>
              <Button onClick={() => setCustomModalOpen(false)}>
                Save Changes
              </Button>
            </div>
          </Modal>
        </div>
      ),
      category: "content",
    },
    {
      id: "glass",
      title: "Glass Morphism Modal",
      description: "A modal with glass morphism effect.",
      code: `const [glassModalOpen, setGlassModalOpen] = useState(false);\n\n<Button onClick={() => setGlassModalOpen(true)}>\n  Open Glass Modal\n</Button>\n\n<Modal\n  isOpen={glassModalOpen}\n  onClose={() => setGlassModalOpen(false)}\n  title="Glass Modal"\n  variant="glass"\n>\n  <p className="${
        darkMode ? "text-gray-300" : "text-gray-600"
      } mb-4">\n    This modal has a beautiful glass morphism effect with backdrop blur.\n  </p>\n  <div className="flex justify-end space-x-2">\n    <Button variant="secondary" onClick={() => setGlassModalOpen(false)}>\n      Cancel\n    </Button>\n    <Button onClick={() => setGlassModalOpen(false)}>\n      Confirm\n    </Button>\n  </div>\n</Modal>`,
      content: (
        <div>
          <Button onClick={() => setGlassModalOpen(true)}>
            Open Glass Modal
          </Button>

          <Modal
            isOpen={glassModalOpen}
            onClose={() => setGlassModalOpen(false)}
            title="Glass Modal"
            variant="glass"
          >
            <p
              className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}
            >
              This modal has a beautiful glass morphism effect with backdrop
              blur.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setGlassModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setGlassModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </div>
      ),
      category: "styles",
    },
    {
      id: "form",
      title: "Form Modal",
      description: "A modal containing a form with various input fields.",
      code: `const [formModalOpen, setFormModalOpen] = useState(false);\n\n<Button onClick={() => setFormModalOpen(true)}>\n  Open Form Modal\n</Button>\n\n<Modal\n  isOpen={formModalOpen}\n  onClose={() => setFormModalOpen(false)}\n  title="Contact Form"\n  size="medium"\n>\n  <form className="space-y-4">\n    <div>\n      <label className="block text-sm font-medium ${
        darkMode ? "text-gray-300" : "text-gray-700"
      } mb-1">Name</label>\n      <input type="text" className="w-full px-3 py-2 border ${
        darkMode
          ? "bg-gray-700/50 border-gray-600 text-white"
          : "bg-white border-gray-300 text-gray-900"
      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />\n    </div>\n    <div>\n      <label className="block text-sm font-medium ${
        darkMode ? "text-gray-300" : "text-gray-700"
      } mb-1">Email</label>\n      <input type="email" className="w-full px-3 py-2 border ${
        darkMode
          ? "bg-gray-700/50 border-gray-600 text-white"
          : "bg-white border-gray-300 text-gray-900"
      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />\n    </div>\n    <div>\n      <label className="block text-sm font-medium ${
        darkMode ? "text-gray-300" : "text-gray-700"
      } mb-1">Message</label>\n      <textarea rows={3} className="w-full px-3 py-2 border ${
        darkMode
          ? "bg-gray-700/50 border-gray-600 text-white"
          : "bg-white border-gray-300 text-gray-900"
      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>\n    </div>\n    <div className="flex justify-end space-x-2 pt-4">\n      <Button variant="secondary" onClick={() => setFormModalOpen(false)}>\n        Cancel\n      </Button>\n      <Button type="submit">Submit</Button>\n    </div>\n  </form>\n</Modal>`,
      content: (
        <div>
          <Button onClick={() => setFormModalOpen(true)}>
            Open Form Modal
          </Button>

          <Modal
            isOpen={formModalOpen}
            onClose={() => setFormModalOpen(false)}
            title="Contact Form"
            size="medium"
          >
            <form className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Message
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-3 py-2 border ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setFormModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Modal>
        </div>
      ),
      category: "content",
    },
    {
      id: "notification",
      title: "Notification Modal",
      description: "A small notification-style modal.",
      code: `const [notificationModalOpen, setNotificationModalOpen] = useState(false);\n\n<Button onClick={() => setNotificationModalOpen(true)}>\n  Show Notification\n</Button>\n\n<Modal\n  isOpen={notificationModalOpen}\n  onClose={() => setNotificationModalOpen(false)}\n  size="small"\n  showOverlay={false}\n  blurOverlay={false}\n  className="absolute top-4 right-4"\n>\n  <div className="flex items-start">\n    <div className="flex-shrink-0">\n      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />\n      </svg>\n    </div>\n    <div className="ml-3">\n      <h3 className="text-sm font-medium ${
        darkMode ? "text-white" : "text-gray-900"
      }">Success!</h3>\n      <p className="mt-1 text-sm ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }">Your action has been completed successfully.</p>\n    </div>\n  </div>\n</Modal>`,
      content: (
        <div>
          <Button onClick={() => setNotificationModalOpen(true)}>
            Show Notification
          </Button>

          <Modal
            isOpen={notificationModalOpen}
            onClose={() => setNotificationModalOpen(false)}
            size="small"
            showOverlay={false}
            blurOverlay={false}
            className="absolute top-4 right-4"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Success!
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Your action has been completed successfully.
                </p>
              </div>
            </div>
          </Modal>
        </div>
      ),
      category: "styles",
    },
  ].filter((modal) => {
    const matchesTab = activeTab === "all" || modal.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      modal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
        style={{
          width: sidebarOpen ? "calc(100vw - 16rem)" : "100vw",
        }}
      >
        <div className="sticky top-0 z-50">
          <Navbar
            onToggleSidebar={handleToggleSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>

        <main className="flex-1 relative z-10 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Modal Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, accessible, and customizable modal components with
                light and dark mode support
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-8 p-6 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                    darkMode={darkMode}
                  >
                    All Modals
                  </Tab>
                  <Tab
                    active={activeTab === "basic"}
                    onClick={() => setActiveTab("basic")}
                    darkMode={darkMode}
                  >
                    Basic
                  </Tab>
                  <Tab
                    active={activeTab === "sizes"}
                    onClick={() => setActiveTab("sizes")}
                    darkMode={darkMode}
                  >
                    Sizes
                  </Tab>
                  <Tab
                    active={activeTab === "variants"}
                    onClick={() => setActiveTab("variants")}
                    darkMode={darkMode}
                  >
                    Variants
                  </Tab>
                  <Tab
                    active={activeTab === "styles"}
                    onClick={() => setActiveTab("styles")}
                    darkMode={darkMode}
                  >
                    Styles
                  </Tab>
                  <Tab
                    active={activeTab === "content"}
                    onClick={() => setActiveTab("content")}
                    darkMode={darkMode}
                  >
                    Content
                  </Tab>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search modals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Found {filteredModals.length} modal
                {filteredModals.length !== 1 ? "s" : ""} matching "{searchQuery}
                "
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {filteredModals.length > 0 ? (
                filteredModals.map((modal, index) => (
                  <motion.div
                    key={modal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ModalExample
                      title={modal.title}
                      description={modal.description}
                      code={modal.code}
                      darkMode={darkMode}
                    >
                      {modal.content}
                    </ModalExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-12 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3
                    className={`mt-4 text-lg font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    No modals found
                  </h3>
                  <p
                    className={`mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-8 mt-12 shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                How to Use These Modals
              </h2>

              <div
                className={`prose prose-lg ${
                  darkMode ? "prose-invert" : ""
                } max-w-none`}
              >
                <h3
                  className={`${darkMode ? "text-gray-200" : "text-gray-800"}`}
                >
                  Installation
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Copy the <code>Modal</code> component code into your project.
                </p>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Basic Usage
                </h3>
                <div className="relative my-4">
                  <div
                    className={`rounded-xl p-4 ${
                      darkMode
                        ? "bg-gray-900 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    } overflow-x-auto`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Example Code</span>
                      <CopyButton
                        text={`import { Modal } from '@/components/Modal';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content.</p>
        <button onClick={() => setIsOpen(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
}`}
                        darkMode={darkMode}
                      />
                    </div>
                    <pre className="text-sm font-mono">{`import { Modal } from '@/components/Modal';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content.</p>
        <button onClick={() => setIsOpen(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
}`}</pre>
                  </div>
                </div>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Props
                </h3>
                <div
                  className={`rounded-xl border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } overflow-hidden mt-4`}
                >
                  <table className="w-full">
                    <thead
                      className={
                        darkMode
                          ? "bg-gray-700 text-gray-200"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Prop
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Default
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className={darkMode ? "text-white" : "text-black"}>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">isOpen</td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Controls whether the modal is open or closed
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">onClose</td>
                        <td className="px-4 py-3 text-sm">function</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Callback function when modal is closed
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">title</td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Title of the modal (optional)
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">size</td>
                        <td className="px-4 py-3 text-sm">
                          'small' | 'medium' | 'large' | 'xlarge' | 'full'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'medium'
                        </td>
                        <td className="px-4 py-3 text-sm">Size of the modal</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">variant</td>
                        <td className="px-4 py-3 text-sm">
                          'default' | 'primary' | 'danger' | 'success' | 'glass'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'default'
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Color variant of the modal
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          closeOnOverlayClick
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether clicking the overlay closes the modal
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          showCloseButton
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show the close button
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          blurOverlay
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to apply blur effect to the overlay
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          showOverlay
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show the overlay
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          className
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">''</td>
                        <td className="px-4 py-3 text-sm">
                          Additional CSS classes
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
