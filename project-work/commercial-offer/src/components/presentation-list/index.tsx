import React, {useEffect, useState} from "react"
import "./index.css"
import {Presentation} from "../presentation/index";
import {gql, useLazyQuery} from "@apollo/client";
import IPresentationList from "../../models/presentation-list";

export const PresentationList = () => {

    const PRESENTATIONS_QUERY = gql`
        query GetPresentations  {
            presentations {
                _id
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
            if (listPres && listPres.length>0) setList(listPres)
        })
    }, [])


    return (
        <div className="presentation-list">
            <button className="btn btn-primary">Добавить презентацию</button>
            <hr/>
            {list.map((desc: IPresentationList, index: number) => {
                return <Presentation key={index} id={desc._id} description={desc.description}/>
            })}
        </div>
    )
}