import React from "react";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";

function App() {
    return ( <
        div className = "flex min-h-screen bg-[#1e1e2f] text-white font-sans" >
        <
        Sidebar / >
        <
        main className = "ml-[250px] p-6 w-full" >
        <
        Section id = "intro"
        title = "1. Intro to NetSuite" >
        <
        p >
        Welcome to this tutorial.This guide will walk you through the necessary steps to complete the task at hand.Screenshots and tips will be included to make the process as easy to follow as possible. <
        /p> < /
        Section >

        <
        Section id = "rfi"
        title = "2. Entering RFI (Flooring Inc.) Orders" >
        <
        p > Begin by opening the application.Then follow the instructions below: < /p> <
        div className = "bg-[#2a2a3d] border border-gray-600 p-3 my-2" > [Insert Screenshot Here] <
        /div> <
        p > < strong > Figure 1: < /strong> Description of the screenshot above.</p >
        <
        /Section>

        <
        Section id = "afm"
        title = "3. Entering AFM (American Floor Mats) Orders" >
        <
        p >
        Next, configure your settings as shown below.Ensure all fields are correctly filled in before proceeding. <
        /p> <
        div className = "bg-[#2a2a3d] border border-gray-600 p-3 my-2" > [Insert Screenshot Here] <
        /div> <
        p > < strong > Figure 2: < /strong> Settings configuration example.</p >
        <
        /Section> < /
        main > <
        /div>
    );
}

export default App;