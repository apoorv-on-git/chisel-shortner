import React, { useState, useEffect, useCallback } from "react"
import {Row, Col, Button, Table} from "react-bootstrap"

import api from "../services/api"

const textCenter = {
    textAlign: "center",
    margin: "1em"
}

const inputBox = {
    padding: "0.5em 1em",
    width: "20em"
}

const submitButton = {
    padding: "0.5em 1em",
    color: "black",
    backgroundColor: "yellow",
    border: "none",
    borderRadius: "1em",
    fontSize: "1em",
    width: "10em"
}

const tableLayout = {
    width: "100%",
}

const tableCol = {
    textAlign: "center",
    width: "33%"
}

export const getUrlsFromChisel = async () => {
    try {
        const res = await api.get("url", {})
        return res.data
    } catch (error) {
        console.error(error)
    }
}

// markup
export default function IndexPage() {
    const [urls, setUrls] = useState([])
    const [newSlug, setNewSlug] = useState("")
    const [newUrl, setNewUrl] = useState("")

    useEffect(() => {
        const getUrls = async () => {
            setUrls(await getUrlsFromChisel())
        }
        getUrls()
    })

    const handleChangeNewSlug = useCallback(event => {
        setNewSlug(event.target.value)
    }, [])

    const handleChangeNewUrl = useCallback(event => {
        setNewUrl(event.target.value)
    }, [])

    const handleUrlCreation = useCallback(async () => {
        try {
            await api.post("url", {
                slug: newSlug,
                url: newUrl,
            })
            setUrls(await getUrlsFromChisel())
        } catch (error) {
          console.error(error)
        }
        setNewUrl("")
        setNewSlug("")
    }, [setUrls, newSlug, newUrl])

    const handleUrlDelete = useCallback(async (urlId) => {
        try {
            await api.delete(`url`, {
                id: urlId
            })
            setUrls(await getUrlsFromChisel())
        } catch (error) {
            console.log(error)
        }
    })
    
    return (
        <div>
        {
            urls === undefined ? 
            <Row>
                <Col style={textCenter}Z>
                    <h1>Loading</h1>
                </Col>
            </Row> :
            <div> 
                <Row>
                    <Col style={textCenter}Z>
                        <h1>URL Shortner</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={textCenter}>
                        <input 
                            style={inputBox}
                            onChange={handleChangeNewSlug}
                            value={newSlug}
                            type="text"
                            placeholder="Enter A Slug" 
                        />
                    </Col>
                    <Col style={textCenter}>
                        <input
                            style={inputBox}
                            onChange={handleChangeNewUrl}
                            value={newUrl}
                            type="text"
                            placeholder="Enter A URL"
                        />
                    </Col>
                    <Col style={textCenter}>
                        <Button onClick={handleUrlCreation} style={submitButton}>SAVE</Button>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col style={textCenter}Z>
                        <h1>URL(s) Created</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            urls.length === 0 ? <h2 style={textCenter}>No Entries Created</h2> :
                            <Table style={tableLayout}>
                                <thead>
                                    <tr>
                                        <td style={tableCol}><h2>URL</h2></td>
                                        <td style={tableCol}><h2>Slug</h2></td>
                                        <td style={tableCol}><h2>Action</h2></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        urls.map(url => (
                                            <tr>
                                                <td style={tableCol}>{url.url}</td>
                                                <td style={tableCol}>{url.slug}</td>
                                                <td style={tableCol}>
                                                    <Button onClick={() => handleUrlDelete(url.id)}>DELETE</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
            </div>
        }
        </div>
    )
}
