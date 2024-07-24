import {React,useState,useEffect} from "react";
import "./card.css";

export default function Card(props){

    const [lvlcolor, setlvlcolor] = useState("#FFFFFF");

    useEffect(() => {
        if (props.problem.level.toLocaleLowerCase() == "easy") {
          setlvlcolor("#46C6A9");
        }
        else if (props.problem.level.toLocaleLowerCase() == "medium") {
          setlvlcolor("#FFA115");
        }
        else if (props.problem.level.toLocaleLowerCase() == "hard") {
          setlvlcolor("#f5334a");
        }
        return () => {
    
        };
    });

    function navigateToPage() {
        window.location.href = "/solve";
    }

    return(
        <>
            <div className="card" onClick={navigateToPage}>
                <span>{props.slno}</span>
                <span>{props.problem.problem}</span>
                <span style={{ color: lvlcolor }}>{props.problem.level}</span>
            </div>
        </>
    )
}