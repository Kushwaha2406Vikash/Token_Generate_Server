import React, { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/solid";

function MCPServerConfig() {
  // REAL config object (data)
  const serverConfig = {
    ExpenseTracker: {
      transport: "streamable_http",
      url: "https://api.githubcopilot.com/mcp/",
      headers: {
        authorization: "__PYTHON_FSTRING__",
      },
    },
  };

  // UI display version (string, not JSON.stringify)
  const displayConfig = `
{
  "ExpenseTracker": {
    "transport": "streamable_http",
    "url": "https://expense-tracker-mcp-server-t861.onrender.com/mcp",
    "headers": {
      "authorization": f"Bearer {expense_tracker_api_key}"
    }
  }
}
`.trim();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        MCP Server Config
      </h2>

      {/* UI DISPLAY (Python-style) */}
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-800">
        {displayConfig}
      </pre>

      <button
        onClick={handleCopy}
        className={`mt-4 flex items-center gap-2 px-4 py-2 rounded text-black font-medium transition-colors ${
          copied ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {copied ? (
          <>
            <CheckIcon className="w-5 h-5" />
            Copied!
          </>
        ) : (
          <>
            <ClipboardIcon className="w-5 h-5" />
            Copy to Clipboard
          </>
        )}
      </button>
    </div>
  );
}

export default MCPServerConfig;
