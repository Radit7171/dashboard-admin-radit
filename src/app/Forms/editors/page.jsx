"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Rich Text Editor (Sederhana)
const RichTextEditor = ({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const editorRef = useRef(null);
  const [activeTool, setActiveTool] = useState(null);

  const handleFormat = (format) => {
    document.execCommand(format, false, null);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    setActiveTool(format);
    setTimeout(() => setActiveTool(null), 300);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const ToolButton = ({ format, icon, title }) => (
    <motion.button
      type="button"
      onClick={() => handleFormat(format)}
      className={`p-2.5 rounded-lg transition-all ${
        darkMode
          ? "hover:bg-gray-600 text-white"
          : "hover:bg-gray-200 text-gray-700"
      } ${
        activeTool === format
          ? darkMode
            ? "bg-blue-500"
            : "bg-blue-100 text-blue-600"
          : ""
      }`}
      title={title}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  );

  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-wrap gap-1 p-3 rounded-t-xl border ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-300"
        }`}
      >
        <ToolButton
          format="bold"
          title="Bold"
          icon={<strong className="font-bold">B</strong>}
        />
        <ToolButton
          format="italic"
          title="Italic"
          icon={<em className="italic">I</em>}
        />
        <ToolButton
          format="underline"
          title="Underline"
          icon={<u className="underline">U</u>}
        />
        <div className="border-r mx-1 h-6 self-center border-gray-400"></div>
        <ToolButton
          format="insertUnorderedList"
          title="Bullet List"
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.75-1.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 8a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          }
        />
        <ToolButton
          format="insertOrderedList"
          title="Numbered List"
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2.003 2.5a.5.5 0 00-.723-.447l-1.003.5a.5.5 0 00.446.895l.28-.14V6H.5a.5.5 0 000 1h2.006a.5.5 0 100-1h-.503V2.5zM5 3.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 3.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM.924 10.32l.003-.004a.851.851 0 01.144-.153A.66.66 0 011.5 10c.195 0 .306.068.374.146a.57.57 0 01.128.376c0 .453-.269.682-.8 1.078l-.035.025C.692 11.98 0 12.495 0 13.5a.5.5 0 00.5.5h2.003a.5.5 0 000-1H1.146c.132-.197.351-.372.654-.597l.047-.035c.47-.35 1.156-.858 1.156-1.845 0-.365-.118-.744-.377-1.038-.268-.303-.658-.484-1.126-.484-.48 0-.84.202-1.068.392a1.858 1.858 0 00-.348.384l-.007.011-.002.004-.001.002-.001.001a.5.5 0 00.851.525zM.5 10.055l-.427-.26.427.26z"
              />
            </svg>
          }
        />
        <div className="border-r mx-1 h-6 self-center border-gray-400"></div>
        <ToolButton
          format="justifyLeft"
          title="Align Left"
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
              />
            </svg>
          }
        />
        <ToolButton
          format="justifyCenter"
          title="Align Center"
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M4 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
              />
            </svg>
          }
        />
        <ToolButton
          format="justifyRight"
          title="Align Right"
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm4-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
              />
            </svg>
          }
        />
        <div className="flex-grow"></div>
        <motion.button
          type="button"
          className={`p-2.5 rounded-lg flex items-center gap-1.5 text-sm ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Insert Image
        </motion.button>
      </motion.div>

      {/* Editor Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className={`min-h-56 p-4 rounded-b-xl border border-t-0 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : darkMode
            ? "border-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
        } transition-colors duration-200 overflow-y-auto shadow-inner`}
      />

      {helperText && (
        <p
          className={`mt-2 text-sm ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Komponen Markdown Editor
const MarkdownEditor = ({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [preview, setPreview] = useState(false);

  // Simple Markdown to HTML converter (basic implementation)
  const renderMarkdown = (text) => {
    if (!text) return "";

    // Replace Markdown syntax with HTML
    return text
      .replace(
        /^### (.*$)/gim,
        "<h3 class='text-lg font-bold mt-4 mb-2'>$1</h3>"
      )
      .replace(
        /^## (.*$)/gim,
        "<h2 class='text-xl font-bold mt-5 mb-3'>$1</h2>"
      )
      .replace(
        /^# (.*$)/gim,
        "<h1 class='text-2xl font-bold mt-6 mb-4'>$1</h1>"
      )
      .replace(/\*\*(.*)\*\*/gim, "<strong class='font-bold'>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em class='italic'>$1</em>")
      .replace(
        /!\[(.*?)\]\((.*?)\)/gim,
        "<img alt='$1' src='$2' class='rounded-lg my-2 max-w-full' />"
      )
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        "<a href='$2' class='text-blue-500 hover:underline'>$1</a>"
      )
      .replace(/\n/gim, "<br />");
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        {label && (
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <motion.button
          type="button"
          onClick={() => setPreview(!preview)}
          className={`px-4 py-2 text-sm rounded-lg font-medium flex items-center gap-2 ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {preview ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </>
          )}
        </motion.button>
      </div>

      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`min-h-56 p-5 rounded-xl border ${
            darkMode
              ? "border-gray-700 bg-gray-800 text-white"
              : "border-gray-300 bg-white text-gray-900"
          } overflow-y-auto prose max-w-none ${darkMode ? "prose-invert" : ""}`}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      ) : (
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full min-h-56 p-5 rounded-xl border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : darkMode
              ? "border-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
          } transition-colors duration-200 font-mono text-sm shadow-inner`}
          placeholder="Type your Markdown here..."
        />
      )}

      {helperText && (
        <p
          className={`mt-2 text-sm ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`mt-3 p-3 rounded-lg flex items-start gap-2 ${
          darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
        }`}
      >
        <svg
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="text-xs">
          <span className="font-semibold">Markdown Tips:</span> Use # for
          headers, **text** for bold, *text* for italic, ``` for code blocks
        </div>
      </motion.div>
    </div>
  );
};

// Komponen Code Editor
const CodeEditor = ({
  label,
  value,
  onChange,
  language = "javascript",
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [copied, setCopied] = useState(false);

  // Count lines for line numbers
  const lineCount = value ? value.split("\n").length : 1;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        {label && (
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              darkMode
                ? "bg-blue-900 text-blue-200"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {language.toUpperCase()}
          </span>
          <motion.button
            type="button"
            onClick={() => setLineNumbers(!lineNumbers)}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={lineNumbers ? "Hide line numbers" : "Show line numbers"}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </motion.button>
          <motion.button
            type="button"
            onClick={copyToClipboard}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Copy code"
          >
            {copied ? (
              <svg
                className="w-4 h-4 text-green-500"
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
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative rounded-xl border overflow-hidden ${
          error
            ? "border-red-500"
            : darkMode
            ? "border-gray-700"
            : "border-gray-300"
        }`}
      >
        {lineNumbers && (
          <div
            className={`absolute left-0 top-0 bottom-0 overflow-hidden py-4 text-right ${
              darkMode
                ? "bg-gray-900 text-gray-500"
                : "bg-gray-100 text-gray-400"
            } font-mono text-sm w-12 border-r ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="px-2">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full min-h-56 p-4 font-mono text-sm ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
          } focus:outline-none resize-none ${lineNumbers ? "pl-14" : ""}`}
          style={{ tabSize: 2 }}
          placeholder={`// Write your ${language} code here...`}
          spellCheck="false"
        />
      </motion.div>

      {helperText && (
        <p
          className={`mt-2 text-sm ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Komponen untuk contoh penggunaan form editors
const EditorExample = ({
  title,
  description,
  children,
  code,
  darkMode,
  tags,
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <div className="flex gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode
                      ? "bg-blue-900/30 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={copyCode}
            className={`p-2.5 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Copy code"
          >
            {copied ? (
              <svg
                className="w-4 h-4 text-green-500"
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
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </motion.button>
          <motion.button
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className={`px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCodeVisible ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                Hide Code
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Show Code
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="mb-6">{children}</div>

      <AnimatePresence>
        {isCodeVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div
              className={`rounded-xl p-4 ${
                darkMode
                  ? "bg-gray-900 text-gray-200"
                  : "bg-gray-100 text-gray-800"
              } overflow-x-auto`}
            >
              <pre className="text-sm font-mono">{code}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children, count }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.button
      onClick={onClick}
      className={`px-5 py-2.5 font-medium rounded-lg flex items-center gap-2 transition-colors relative ${
        active
          ? darkMode
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-700"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            active
              ? darkMode
                ? "bg-blue-700"
                : "bg-blue-200"
              : darkMode
              ? "bg-gray-600"
              : "bg-gray-200"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
};

export default function EditorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // State untuk editor content
  const [editorData, setEditorData] = useState({
    richText:
      "<h2>Welcome to Rich Text Editor</h2><p>This is a <strong>simple rich text editor</strong> with basic formatting options.</p><ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>",
    markdown:
      "# Welcome to Markdown Editor\n\nThis is a **Markdown editor** with live preview.\n\n## Features\n- Easy to use\n- Live preview\n- Common Markdown syntax supported\n\n```javascript\nfunction hello() {\n  console.log('Hello, world!');\n}\n```",
    javascript:
      "// JavaScript code example\nfunction calculateTotal(items) {\n  return items.reduce((total, item) => {\n    return total + (item.price * item.quantity);\n  }, 0);\n}\n\nconst cart = [\n  { name: 'Product 1', price: 10.99, quantity: 2 },\n  { name: 'Product 2', price: 5.50, quantity: 1 }\n];\n\nconst total = calculateTotal(cart);\nconsole.log(`Total: $${total.toFixed(2)}`);",
    html: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Example Page</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 40px;\n            line-height: 1.6;\n        }\n        .container {\n            max-width: 800px;\n            margin: 0 auto;\n        }\n    </style>\n</head>\n<body>\n    <div class="container">\n        <h1>Hello, World!</h1>\n        <p>This is an example HTML page.</p>\n    </div>\n</body>\n</html>',
    css: "/* CSS code example */\nbody {\n    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n    line-height: 1.6;\n    color: #333;\n    background-color: #f8f9fa;\n}\n\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 20px;\n}\n\n.card {\n    background: white;\n    border-radius: 8px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n    padding: 24px;\n    margin-bottom: 24px;\n}\n\n.btn {\n    display: inline-block;\n    padding: 10px 20px;\n    background-color: #007bff;\n    color: white;\n    border-radius: 4px;\n    text-decoration: none;\n    transition: background-color 0.2s;\n}\n\n.btn:hover {\n    background-color: #0056b3;\n}",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (field, value) => {
    setEditorData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter editors berdasarkan tab aktif
  const editors = [
    {
      id: "rich-text",
      title: "Rich Text Editor",
      description: "A WYSIWYG editor with formatting tools for rich content.",
      code: `<RichTextEditor
  label="Content"
  value={editorData.richText}
  onChange={(value) => handleInputChange("richText", value)}
  helperText="Use the toolbar to format your content"
/>`,
      content: (
        <RichTextEditor
          label="Content"
          value={editorData.richText}
          onChange={(value) => handleInputChange("richText", value)}
          helperText="Use the toolbar to format your content"
        />
      ),
      category: "wysiwyg",
      tags: ["WYSIWYG", "Rich Text"],
    },
    {
      id: "markdown",
      title: "Markdown Editor",
      description: "A Markdown editor with live preview toggle.",
      code: `<MarkdownEditor
  label="Markdown Content"
  value={editorData.markdown}
  onChange={(value) => handleInputChange("markdown", value)}
  helperText="Use Markdown syntax to format your content"
/>`,
      content: (
        <MarkdownEditor
          label="Markdown Content"
          value={editorData.markdown}
          onChange={(value) => handleInputChange("markdown", value)}
          helperText="Use Markdown syntax to format your content"
        />
      ),
      category: "markdown",
      tags: ["Markdown", "Preview"],
    },
    {
      id: "javascript",
      title: "Code Editor (JavaScript)",
      description: "A code editor with line numbers and syntax awareness.",
      code: `<CodeEditor
  label="JavaScript Code"
  value={editorData.javascript}
  onChange={(value) => handleInputChange("javascript", value)}
  language="javascript"
  helperText="Write your JavaScript code here"
/>`,
      content: (
        <CodeEditor
          label="JavaScript Code"
          value={editorData.javascript}
          onChange={(value) => handleInputChange("javascript", value)}
          language="javascript"
          helperText="Write your JavaScript code here"
        />
      ),
      category: "code",
      tags: ["JavaScript", "Code"],
    },
    {
      id: "html",
      title: "Code Editor (HTML)",
      description: "A code editor for HTML with line numbers.",
      code: `<CodeEditor
  label="HTML Code"
  value={editorData.html}
  onChange={(value) => handleInputChange("html", value)}
  language="html"
  helperText="Write your HTML code here"
/>`,
      content: (
        <CodeEditor
          label="HTML Code"
          value={editorData.html}
          onChange={(value) => handleInputChange("html", value)}
          language="html"
          helperText="Write your HTML code here"
        />
      ),
      category: "code",
      tags: ["HTML", "Web"],
    },
    {
      id: "css",
      title: "Code Editor (CSS)",
      description: "A code editor for CSS with line numbers.",
      code: `<CodeEditor
  label="CSS Code"
  value={editorData.css}
  onChange={(value) => handleInputChange("css", value)}
  language="css"
  helperText="Write your CSS code here"
/>`,
      content: (
        <CodeEditor
          label="CSS Code"
          value={editorData.css}
          onChange={(value) => handleInputChange("css", value)}
          language="css"
          helperText="Write your CSS code here"
        />
      ),
      category: "code",
      tags: ["CSS", "Styling"],
    },
  ];

  const filteredEditors = editors.filter((editor) => {
    const matchesTab = activeTab === "all" || editor.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      editor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      editor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      editor.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  const getTabCount = (tab) => {
    if (tab === "all") return editors.length;
    return editors.filter((editor) => editor.category === tab).length;
  };

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
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center p-2 mb-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.div>
              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Form Editors
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Advanced editor components with light and dark mode support.
                Choose from rich text, markdown, or code editors.
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-8 p-6 rounded-2xl sticky top-24 z-10 ${
                isScrolled ? "shadow-lg backdrop-blur-sm bg-opacity-90 " : ""
              } ${
                darkMode
                  ? "bg-gray-800/90 border-gray-700"
                  : "bg-white/90 border-gray-200"
              } border transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                    count={getTabCount("all")}
                  >
                    All Editors
                  </Tab>
                  <Tab
                    active={activeTab === "wysiwyg"}
                    onClick={() => setActiveTab("wysiwyg")}
                    count={getTabCount("wysiwyg")}
                  >
                    WYSIWYG
                  </Tab>
                  <Tab
                    active={activeTab === "markdown"}
                    onClick={() => setActiveTab("markdown")}
                    count={getTabCount("markdown")}
                  >
                    Markdown
                  </Tab>
                  <Tab
                    active={activeTab === "code"}
                    onClick={() => setActiveTab("code")}
                    count={getTabCount("code")}
                  >
                    Code
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
                    placeholder="Search editors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2.5 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 transition-colors duration-200 w-full md:w-64`}
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
                Found {filteredEditors.length} editor
                {filteredEditors.length !== 1 ? "s" : ""} matching "
                {searchQuery}"
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {filteredEditors.length > 0 ? (
                filteredEditors.map((editor, index) => (
                  <motion.div
                    key={editor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EditorExample
                      title={editor.title}
                      description={editor.description}
                      code={editor.code}
                      darkMode={darkMode}
                      tags={editor.tags}
                    >
                      {editor.content}
                    </EditorExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
                    No editors found
                  </h3>
                  <p
                    className={`mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                    }}
                    className={`mt-4 px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
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
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2.5 rounded-full ${
                    darkMode ? "bg-blue-900/20" : "bg-blue-100"
                  } text-blue-500`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  How to Use These Editors
                </h2>
              </div>

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
                  Copy the editor component code into your project. Each editor
                  is designed to work independently.
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
                    <pre className="text-sm font-mono">{`import { RichTextEditor, MarkdownEditor, CodeEditor } from '@/components/FormEditors';

// Rich text editor
<RichTextEditor
  label="Content"
  value={content}
  onChange={setContent}
/>

// Markdown editor
<MarkdownEditor
  label="Markdown Content"
  value={markdown}
  onChange={setMarkdown}
/>

// Code editor
<CodeEditor
  label="JavaScript Code"
  value={code}
  onChange={setCode}
  language="javascript"
/>`}</pre>
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
                          Component
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Key Props
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        <td className="px-4 py-3 font-mono text-sm">
                          RichTextEditor
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, helperText
                        </td>
                        <td className="px-4 py-3 text-sm">
                          WYSIWYG editor with formatting toolbar
                        </td>
                      </tr>
                      <tr
                        className={`${
                          darkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <td className="px-4 py-3 font-mono text-sm">
                          MarkdownEditor
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, helperText
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Markdown editor with preview toggle
                        </td>
                      </tr>
                      <tr
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        <td className="px-4 py-3 font-mono text-sm">
                          CodeEditor
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, language, helperText
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Code editor with line numbers and language support
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
