import React from 'react'
import { Col, Row } from "reactstrap";

export default function Content(props)
{
    return (
        <>
            <div className="u-content">
                <div className="u-body">
                    {props.content}
                    <Row>
                        <Col md="12" className="btn-block mb-5 d-print-none"></Col>
                    </Row>
                </div>
                <footer 
                    className="d-print-none u-footer bg-light d-md-flex align-items-md-center text-center text-md-left text-muted text-muted">
                    <p className="h5 mb-2 mb-md-0">
                        © {new Date().getFullYear()} &#160;
                        <a href="https://www.verarealty.com" className="link-muted" target="_blank">
                            VeraRealty
                        </a> All Rights Reserved.
                    </p>
                </footer>
            </div>
        </>
    )
}