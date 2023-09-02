import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import EnhancedTable from './components/EnhancedTable'
import NewVolunteerForm from './components/NewVolunteerForm'
import PhotoCompOne from './components/PhotoCompOne'
import CurrentProjects from './components/CurrentProjects'
import FAQ from './components/FAQ'
import PhotoCompTwo from './components/PhotoCompTwo'
import ToggleTable from './components/ToggleTable'
import StoreSelector from './components/StoreSelector'
import Footer from './components/Footer'
import ThemeSong from './components/ThemeSong'

function App() {
    const [storeNumber, setStoreNumber] = useState('')
    const [rows, setRows] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/Volunteers");
            const data = response.data;
            setRows(data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="App">
            {/* <ThemeSong /> */}
            <div className="banner">
                <h1>Team Depot Store Portal</h1>
            </div>
            <div className="button-bar">
                <NewVolunteerForm onSubmit={fetchData}/>
                <div>
                    <h2 id="store-number-display">{storeNumber}</h2>
                </div>
                <StoreSelector updateStoreNumber={setStoreNumber}/>
            </div>
            <div className="flex-quadrant-container">
                <CurrentProjects />
                <PhotoCompOne />
                <PhotoCompTwo />
                <FAQ />
            </div>
            <div>
                <ToggleTable rows={rows}/>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default App
