import React, {useEffect, useState} from "react"
import "./index.css"
import {Presentation} from "../presentation/index";
import {gql, useLazyQuery} from "@apollo/client";
import IPresentationList from "../../models/presentation-list";

export const PresentationList = () => {

    const PRESENTATIONS_QUERY = gql`
        query GetPresentations  {
            presentations {
                description
            }
        }
    `;

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATIONS_QUERY, {});

    //state
    let [list, setList] = useState([])

    useEffect(() => {
        loadExpenseStatus().then((data) => {
            const listPres = data.data.presentations
            console.log(listPres)
            if (listPres && listPres.length>0) setList(listPres)
        })

    }, [])


    return (
        <div className="presentation-list">
            {list && list.map((desc: IPresentationList, index: number) => {
                return <Presentation key={index} description={desc.description}/>
            })}
        </div>
    )
}