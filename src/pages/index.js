import React, { useState, useEffect } from "react"
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
}

export const getUrlsFromChisel = async () => {
    try {
        const res = await api.get("urls", {})
        return res.data
    } catch (error) {
        console.error(error)
    }
}

// markup
export default function IndexPage() {
    const [urls, setUrls] = useState([])

    useEffect(() => {
        const getUrls = async () => {
            setUrls(await getUrlsFromChisel())
        }
        getUrls()
    })
    
    console.log(urls)
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
                        <input style={inputBox} type="text" id="slug" placeholder="Enter A Slug" />
                    </Col>
                    <Col style={textCenter}>
                        <input style={inputBox} type="text" id="url" placeholder="Enter A URL" />
                    </Col>
                    <Col style={textCenter}>
                        <Button style={submitButton}>SAVE</Button>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={tableCol}>Testing</td>
                                        <td style={tableCol}>Testing</td>
                                    </tr>
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
