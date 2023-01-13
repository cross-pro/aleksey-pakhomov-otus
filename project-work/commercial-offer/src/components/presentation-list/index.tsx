import React, {useEffect, useState} from "react"
import "./index.css"
import {Presentation} from "../presentation/index";
import {useLazyQuery} from "@apollo/client";
import IPresentationList from "../../models/presentation-list";
import {useDispatch, useSelector} from "react-redux";
import {PRESENTATIONS_QUERY} from "../../gql/guery";

export const PresentationList = () => {

    const dispatch = useDispatch()

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATIONS_QUERY, {fetchPolicy: "no-cache" });

    let listData = useSelector((state: any) => {
            return state.presentationList
        }
    )

    const getList = () => {
        loadExpenseStatus().then((data) => {
            const {presentations} = data.data

            if (presentations && presentations.length > 0) {
                dispatch({
                    type: "PRESENTATION_LIST",
                    presentationList: presentations
                })
            }
        })
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className="presentation-list">
            <button className="btn btn-primary">Добавить презентацию</button>
            <hr/>
            {listData && listData.map((desc: IPresentationList, index: number) => {
                return <Presentation key={index} id={desc._id} description={desc.description}/>
            })}
        </div>
    )
}
