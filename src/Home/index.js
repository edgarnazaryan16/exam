import { useEffect, useState } from "react";
import { API } from "./helpers";
import "./style.css"
const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [countries, setCountries] = useState([]);
    const getCountries = async() => {
        try {
            const response = await fetch(inputValue === '' ? `${API}/all` : `${API}/name/${inputValue}`);
            const data = await response.json();
            setCountries(data)
        } catch {
            console.log("Page Not Found")
        }
        
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    useEffect(() => {
        getCountries()
    }, [inputValue])
    return (
        <>
            <div>
                <input value={inputValue} onChange={(e) => handleInputChange(e)}/>
            </div>
            {countries.status === 404 ? <>Page Not Found</> : <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Time Zone</td>
                            <td>Languages</td>
                            <td>Flag</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countries.map(({name: {common}, timezones, languages, flags:{png, alt}, ccn3}) => {
                                console.log(languages)
                                return (<tr key={ccn3}>
                                    <td>{common}</td>
                                    <td>{timezones.join(', ')}</td>
                                    <td>{languages ? Object.values(languages).join(', ') : ''}</td>
                                    <td><img src={png} alt={alt}/></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            }
        </>

    )
}
export default Home;