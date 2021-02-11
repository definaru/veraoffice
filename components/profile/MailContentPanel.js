import React from 'react'
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { FaTelegramPlane, FaTimes } from 'react-icons/fa'

export function MailContentPanel(props)
{
    return (
        <Row>
            <Col md="12">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="pt-3">Mail Box</h5>
                    </div>
                    <div>
                        <button className="btn btn-default" onClick={props.closeMail}>
                            &#10006;
                        </button>                                          
                    </div>
                </div>
                <form>
                    <FormGroup>
                        <Label>Email to:</Label>
                        <Input type="email" name="email" placeholder="recipient's email address"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Header mail:</Label>
                        <Input type="text" name="header" placeholder="Header mail"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>File</Label>
                        <Input type="file" name="file" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Your message</Label>
                        <Input type="textarea" name="text" />
                    </FormGroup>
                    <Button className="btn btn-outline-dark mr-2" onClick={props.closeMail}>
                        &#160;<FaTimes />&#160;
                        Cancel&#160;
                    </Button>
                    <Button color="primary">
                        &#160;<FaTelegramPlane />&#160;
                        Submit&#160;
                    </Button>
                </form>
            </Col>
        </Row>
    )
}