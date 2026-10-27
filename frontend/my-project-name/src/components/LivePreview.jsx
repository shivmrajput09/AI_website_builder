import React, { useState } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
// Clerk hook se hum current user ka token nikalenge backend verification ke liye
import { useAuth } from "@clerk/clerk-react"; 

export default function LivePreview() {
  const { getToken } = useAuth(); // Clerk token generator
  const [prompt, setPrompt] = useState(""); // User jo text input karega usko store karne ke liye
  const [loading, setLoading] = useState(false); // API call ke time loading state dikhane ke liye
  
  // Default files jo shuru mein dikhengi
  const [files, setFiles] = useState({
    "/App.js": `import React from "react";\nimport "./styles.css";\n\nexport default function App() {\n  return (\n    <div className="App">\n      <h2>Welcome to AI Website Builder</h2>\n      <p>Type a prompt above and click generate!</p>\n    </div>\n  );\n}`,
    "/styles.css": `body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 50px;\n}`
  });

  // Jab user "Generate" button par click karega toh ye function chalega
  const handleGenerate = async () => {
    if (!prompt.trim()) return; // Agar input khali hai toh kuch mat karo
    
    setLoading(true);
    
    try {
      // 1. Clerk se secure token get karo
      const token = await getToken(); 

      // 2. Apne Node.js Backend API ko request bhejo
      const response = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Token bhejna zaroori hai kyunki backend protected hai
        },
        body: JSON.stringify({ prompt }) // User ka text prompt backend ko bhej rahe hain
      });

      const data = await response.json();

      // 3. Agar backend ne files return ki hain, toh Sandpack ka state update kar do
      if (response.ok && data.files) {
        setFiles(data.files);
      } else {
        console.error("Error from API:", data.error);
        alert("Failed to generate code: " + data.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error occurred while fetching AI code.");
    } finally {
      setLoading(false); // Loading animation band kar do
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* 🟢 PROMPT INPUT SECTION 🟢 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the component you want to build (e.g., A dark mode login form)"
          style={{ 
            flex: 1, 
            padding: '12px', 
            fontSize: '16px', 
            borderRadius: '6px', 
            border: '1px solid #ccc' 
          }}
          disabled={loading} // Agar API call chal rahi hai toh input lock kar do
        />
        <button 
          onClick={handleGenerate}
          disabled={loading} // Loading ke time button disable kar do
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px', 
            backgroundColor: loading ? '#6c757d' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>

      {/* 🟢 SANDPACK LIVE PREVIEW SECTION 🟢 */}
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <Sandpack 
          template="react" 
          files={files} // Ab ye state backend se aane wale naye code se update hogi
          theme="dark"
          options={{
            showNavigator: true,
            showTabs: true,
            editorHeight: "600px" // Editor thoda bada kiya hai achhe view ke liye
          }}
        />
      </div>
      
    </div>
  );
}