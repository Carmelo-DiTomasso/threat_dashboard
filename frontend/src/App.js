// useState to create + manage component state
import { useState } from "react";

// main component - homepage
function App() {

  // query: stores user input
  // setQuery: function to update query
  const [query, setQuery] = useState("");
  // result: stores API response
  const [result, setResult] = useState(null);
  // loading: tracks API resquest in progress T/F
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  console.log("API URL:", API_URL);

  // Function when user clicks Search
  const handleSearch = async () => {
    setLoading(true); // show loading message
    setResult(null); // clear old results

    try {

      console.log(`Fetching from: ${API_URL}?query=${query}`);
      // Fetch data from Shodan API (will change hardcoded token later)
      const res = await fetch(`${API_URL}?query=${query}`);
      // Convert respone to JSON
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // res - holds response from fetch()
    // await - waits for fetch() to finish
    // .json() - converts  response to JSON
    // setResult - saves data
    // ${query} - Template string that inserts the value of query into the URL

    setLoading(false); // hide loading message
  };

  // This is what is shown on screen  
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px"}}>
      <h1>Threat Intelligence Dashboard</h1>

      {/* input box */}
      <input
        type = "text"
        placeholder="Enter search term"
        value = {query}
        onChange = {(e) => setQuery(e.target.value)} // updates 'query' as user types
      />
      

      {/* button for API call */}
      <button onClick={handleSearch}>
        Search
      </button>

      {/* display text */}
      <p>You searched for: {query}</p>

      {/* If loading is true, show 'Loading...' */}
      {loading && <p>Loading...</p>}

      {/* If result exists, show JSON response */}
      {result && (
        <div style={{ backgroundColor: "#f0f4f8", borderRadiusP: "8px", padding: "15px", marginTop: "20px"}}>
          <h2>IP Details:</h2>
            <p><strong>IP:</strong> {result.ip_str || query}</p>
            <p><strong>ISP:</strong> {result.isp}</p>
            <p><strong>Org:</strong> {result.org}</p>
            <p><strong>Country:</strong> {result.country_name}</p>
            <p><strong>City:</strong> {result.city}</p>

            {result.data && result.data.length > 0 && (
              <div>
                <h3>Exposed Services</h3>

                {result.data.map((entry, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <p><strong>Transport:</strong> {entry.transport || "Unknown"}</p>
                    <p><strong>Banner:</strong></p>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{entry.data || "None"}</pre>
                    <p><strong>Operating System:</strong> {result.os || "Unknown"}</p>
                    <p><strong>Product:</strong> {entry.product || "Unknown"}</p>
                    <p><strong>Version:</strong> {entry.version || "Unknown"}</p>
                    <p><strong>Service Port:</strong> {entry.port}</p>
                  </div>
                ))}
              </div>
            )}


            {result.ports && result.ports.length > 0 && (
              <>
                <h4>Open Ports</h4>
                <ul>
                  {result.ports.map((port, index) => (
                    <li key={index}>Port {port}</li>
                  ))}
                </ul>
              </>
            )}
        </div>
      )}
      
    </div>
  );
}

export default App;

/*
  KEYWORD GLOSSARY:

  useState - Lets React remember and update values (like variables that change)
  query - Stores whatever the user types into the input box
  setQuery - Updates the value of query
  fetch() - Grabs data from an API (makes a request)
  await - Waits for something (like fetch) to finish before moving on
  res.json() - Turns API response into usable JavaScript data
  JSON.stringify(obj, null, 2) - Makes JSON look nice when displaying it on screen
  onChange - Runs code every time the user types something
  onClick - Runs code when a button is clicked
  {loading && <p>Loading...</p>} - Only shows "Loading..." if loading is true
  {result && (...)} - Only shows this stuff if result has data
  export default App - Lets this file be used in other parts of the project
*/
