import { LaunchList } from "./launchList";
import { Map } from "./map";
import { useEffect, useState } from "react";
import { SpaceX } from "../api/spacex";

function App() {

    const [launches, setLaunches] = useState([]);
    const [launchpads, setLaunchpads] = useState([]);
    const [hoveredLaunch, setHoveredLaunch] = useState(null);
    const spacex = new SpaceX();
    useEffect(() => {
        spacex.launches().then(data => {
            setLaunches(data)
        });
        spacex.launchpads().then(data =>
        {
            console.log("raw data:", data);
            setLaunchpads(data);
        });
    }, [])

    return (
        <main className='main'>
            <LaunchList launches={launches}
                        onHover={setHoveredLaunch}
                        hoveredLaunch={hoveredLaunch}/>
            <Map launchpads={launchpads}
                 hoveredLaunch={hoveredLaunch}/>
        </main>
    )
}

export { App };
