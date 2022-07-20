export default async function fetchWithBody(type, url, body, setValue) {
    let paramG = {
        method: type,
        headers: {
            "Content-Type": "application/json"
        }
    }
    let paramP = {
        method: type,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    const response = type === 'GET' ? await fetch(url, paramG) : await fetch(url, paramP);
    // console.log(response)
    if (!response.ok) {
        return (() => { 
            setValue(0);
        }
        )
    }
    let data = await response.json();
    setValue(data);
}