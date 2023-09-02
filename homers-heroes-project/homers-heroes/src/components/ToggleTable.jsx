import React, { useState } from 'react';
import EnhancedTable from "./EnhancedTable";

const ToggleTable = ({ rows }) => {
    const [showTable, setShowTable] = useState(false);

    const handleToggleTable = () => {
        setShowTable(!showTable)
    }

    return (
        <div>
            <span className="toggle-table-span">
                <button id="toggle-table-button" onClick={handleToggleTable}>{showTable ? 'Hide Volunteer list' : 'View All Current Volunteers for Your Store'}</button>
            </span>
            <br />
            <br />
            <div className="Vol-Table">
                {showTable && (
                    <EnhancedTable rows={rows}/>
                )}
            </div>
        </div>
    )


}

export default ToggleTable;