import React, {useEffect, useState} from "react"
import "./index.css"
import {Presentation} from "../presentation/index";
import {useLazyQuery} from "@apollo/client";
import IPresentationList from "../../models/presentation-list";
import {useDispatch, useSelector} from "react-redux";
import {PRESENTATIONS_QUERY} from "../../gql/guery";

export const PresentationList = () => {

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATIONS_QUERY, {});

    let listData = useSelector((state: any) => {
            return state.presentationList
        }
    )
    //state
    let [list, setList] = useState([])

    const updateList = () => {
        loadExpenseStatus().then((data) => {
            listData = data.data.presentations
            if (listData && listData.length > 0) {
                setList(listData)
            }
        })
    }

    useEffect(() => {
        updateList()
    }, [])

    useEffect(() => {
        if (listData) setList(listData)
    }, [listData])


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
