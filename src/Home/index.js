import { useEffect, useState } from "react";
import { API } from "./helpers";
import "./style.css"
import Card from "./Card";
const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [countries, setCountries] = useState([]);
    const getCountries = async() => {
        try {
            const response = await fetch(inputValue === '' ? `${API}/all` : `${API}/name/${inputValue}`);
            const data = await response.json();
            setCountries(data)
        } catch {
            console.log(Error)
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
                <input type="text" value={inputValue} onChange={handleInputChange}/>
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
                            countries.map((item) => {
                                return <Card 
                                    key={item.ccn3}
                                    {...item}
                                />
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