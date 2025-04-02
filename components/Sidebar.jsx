// Sidebar.jsx
import React from "react";

const links = [
    { href: "#intro", label: "1. Intro to NetSuite" },
    { href: "#rfi", label: "2. RFI Orders" },
    { href: "#afm", label: "3. AFM Orders" },
    { href: "#other-orders", label: "4. Other Customer Orders" },
    { href: "#tips", label: "5. Tips & Tricks" },
    { href: "#misc", label: "6. Misc Useful Info" },
];

function Sidebar() {
    return ( <
        nav className = "fixed top-0 left-0 h-screen w-[250px] bg-[#12121e] text-white p-5 border-r border-gray-700 overflow-y-auto" >
        <
        h2 className = "text-xl font-semibold mb-6" > Table of Contents < /h2> <
        ul className = "space-y-2" > {
            links.map((link) => ( <
                li key = { link.href } >
                <
                a href = { link.href }
                className = "block text-indigo-300 hover:bg-[#2a2a4a] rounded px-2 py-1 transition" >
                { link.label } <
                /a> <
                /li>
            ))
        } <
        /ul> <
        /nav>
    );
}

export default Sidebar;