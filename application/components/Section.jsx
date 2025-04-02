// Section.jsx
import React from "react";

function Section({ id, title, children }) {
    return ( <
        section id = { id }
        className = "mb-12" >
        <
        h2 className = "text-2xl font-semibold border-b border-gray-500 pb-2 mb-4" > { title } <
        /h2> { children } <
        /section>
    );
}

export default Section;