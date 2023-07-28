const API_KEY:string = 'i9nLkkgGOiZY9gC9vyMIeEE8AvgC9zLO8paExLzv';
const API_URL:string = 'https://api.nasa.gov/planetary/apod?api_key=';

export default async (urlParams?:string)=>{
  try {
    const response = await fetch(`${API_URL}${API_KEY}${
      typeof urlParams !== 'undefined' && urlParams.length > 0 ? urlParams : ''
    }`);
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}