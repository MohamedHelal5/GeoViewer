
export default function MapLayout({
    firstMap,
    secondMap
}) {
    return (
        <>
            <div className="" style={{ textAlign: 'center', fontSize: '20px', marginTop: "5px" }}>
                <p>NEXT.js + ArcGIS SDK FOR JS + ArcGIS Online + ArcGIS Server 
                    <br></br>
                    <span style={{fontSize: "15px"}}>Mohamed Helal | GIS Developer</span>
                </p>
            </div>

            <div className="Integration" style={{ display: "flex", padding: '10px'}}>
                <div >
                    <div style={{marginRight: '10px'}}>{firstMap}</div>
                </div>
                <div>
                    <div style={{marginLeft: '20px'}}>{secondMap}</div>
                </div>
            </div>

        </>
    )
}