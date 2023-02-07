import React, {useEffect, useState} from "react"
import "./index.css"
import {Presentation} from "../presentation/index";
import {useLazyQuery, useMutation} from "@apollo/client";
import IPresentationList from "../../models/presentation-list";
import {useDispatch, useSelector} from "react-redux";
import {PRESENTATIONS_QUERY} from "../../gql/guery";
import {ADD_PRES} from "../../gql/mutation"

export const PresentationList = () => {

    const dispatch = useDispatch()
    let [title, setTitle] = useState("")

    const [loadExpenseStatus, {loading, error, data}] = useLazyQuery(PRESENTATIONS_QUERY, {fetchPolicy: "no-cache"});

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

    const onChange = (e: any) => {
        let {value} = e.target
        setTitle(value)
    }

    const [insertPresentatation] = useMutation(ADD_PRES, {
        variables: {
            description: title
        }
    })

    const addPres = () => {
        if (!title) return
        insertPresentatation().then(() => {
            getList()
        })
        setTitle("")

    }

    return (
        <div className="presentation-list">
            <input type="text" value={title} onChange={onChange} className="form-control pres-title"/>
            <button className="btn btn-primary btn-add-pres"
                    onClick={addPres}
            >Добавить презентацию
            </button>
            <hr/>
            {listData && listData.map((desc: IPresentationList, index: number) => {
                return <Presentation key={index} id={desc._id} description={desc.description}/>
            })}
        </div>
    )
}
