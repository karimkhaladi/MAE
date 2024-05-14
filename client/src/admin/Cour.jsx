import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Cour() {
    // Get the 'cour' parameter from the URL
    const { cour } = useParams();
    
    // State variable to store the fetched course
    const [cours, setCours] = useState();

    // Fetch the course data when the component mounts
    useEffect(() => {
        axios.get("/api/cour/" + cour)  
            .then((res) => setCours(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            {/* Render the course if it exists */}
            {cours ? (
                <div>
                    {/* Embed the PDF file */}
                    <embed src={`http://localhost:8000/pdf/${cours.filename}`} width="100%" height="900px" />
                </div>
            ) : null}
        </div>
    );
}

export default Cour;
