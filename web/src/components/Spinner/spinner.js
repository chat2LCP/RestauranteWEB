import React from "react"

import './spinner.scss'

const Spinner = () => {
    return(
        <div className="spinner-container">
            <div className="spinner-border spin text-warning" role="status">
                
            </div>
            <strong className="sr-only">Loading...</strong>
        </div>
    ) 
}

export default Spinner