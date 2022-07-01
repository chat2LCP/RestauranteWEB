import React from "react"
import { Spinner } from 'react-bootstrap'

import './SpinnerScreen.scss'

const SpinnerScreen = ({ 
    show 
}) => {
    return( 
        <>
            {
                show && 
                <div className="spinner-container">
                    <Spinner 
                        animation="border" 
                        role="status" 
                        variant="warning" 
                        size="lg"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>  
            }
        </>
    ) 
}

export default SpinnerScreen