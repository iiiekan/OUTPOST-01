export async function fetchSpaceWeather() {
  const apiKey = "DEMO_KEY";
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const response = await fetch(`https://api.nasa.gov/DONKI/FLR?startDate=2026-09-01&endDate=${today}&api_key=${apiKey}`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return data[data.length - 1];
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch NASA data, using fallback.", error);
    return null;
  }
}