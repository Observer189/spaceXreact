import "./launchList.css";

function LaunchList({ launches, onHover, hoveredLaunch }) {

    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer">


                <ul>
                    {launches.map(launch => {
                        return <li key={launch.id}
                                   className={hoveredLaunch?.id === launch.id ? "highlighted" : ""}
                                   onMouseEnter={() => onHover(launch)}
                                   onMouseLeave={() => onHover(null)}

                        >{launch.name}</li>
                    })}
                </ul>
            </div>
        </aside>
    )
}

export { LaunchList }
