import * as d3 from "d3";
import * as Geo from "../geo.json";
import { useRef, useEffect } from "react";

function Map({ launchpads, hoveredLaunch }) {
    const width = 1000;
    const height = 600;
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
    };
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const gRef = useRef(null);
    const projectionRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const svg = d3.select(container).append("svg");
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const projection = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width / 2 - margin.left, height / 2 - margin.top]);

        const path = d3.geoPath().projection(projection);

        g.selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", path)
            .style("opacity", 0.7)
            .style("fill", "#ccc");


        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                g.attr("transform", `translate(${margin.left},${margin.top}) ${event.transform}`);
            });

        svg.call(zoom);


        svgRef.current = svg;
        gRef.current = g;
        projectionRef.current = projection;


        return () => {
            svg.remove();
            svgRef.current = null;
            gRef.current = null;
            projectionRef.current = null;
        };
    }, []);

    useEffect(() => {
        const g = gRef.current;
        const projection = projectionRef.current;
        if (!g || !projection) return;

        //console.log("launchpads:", launchpads.launchpads);
        const sel = g.selectAll("circle.launchpad")
            .data(launchpads, d => d.id);

        const offset = 0.7;

        const enter = sel.enter()
            .append("circle")
            .attr("class", "launchpad")
            .attr("cx", ((d, i) => projection([d.longitude, d.latitude])[0] + i*offset))
            .attr("cy", ((d, i) => projection([d.longitude, d.latitude])[1] + i*offset))
            .attr("r", 3)
            .attr("fill", "blue")
            .attr("stroke", "black")
            .attr("stroke-width", 0.8)
            .style("opacity", 0.8);


        /*console.log("render circles: ", launchpads.launchpads.length);

        launchpads.launchpads.forEach(lp => {
                console.log(lp.name, lp.latitude, lp.longitude);
            });*/


    }, [launchpads]);

    useEffect(() => {
        const g = gRef.current;
        if (!g) return;
        
        g.selectAll("circle.launchpad")
            .attr("fill", "blue")
            .attr("r", 3);

        if (!hoveredLaunch) return;

        const lpId = hoveredLaunch.launchpad;

        g.selectAll("circle.launchpad")
            .filter(d => d.id === lpId)
            .attr("fill", "yellow")
            .attr("r", 7);

    }, [hoveredLaunch]);

    return (
        <div className="mapContainer map" ref={containerRef}>
        </div>
    )
}

export { Map }
