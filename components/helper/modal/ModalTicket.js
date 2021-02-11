import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap'
import { ToastAlert } from '../../../components/alert/ToastAlert'
import { useForm } from 'react-hook-form'
import { FaTelegramPlane } from 'react-icons/fa'
import Fire from '../../../config/fire-config'


export function ModalTicket(props)
{

    const currency = (new Date).getTime()
    const currentUser = Fire.auth().currentUser
    const [info, setInfo] = useState(null)

    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all"
    })

    const onSubmit = data => {
        props.setModal(false)
        Fire.database().ref('ticket/' + props.keycart + '/' + props.href + '/chat/' + props.current).set(data)
        setTimeout(() => {setInfo({code: 200, message: 'Your reply has been successfully sent'})}, 500) 
    }

    return (
        <>
        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog-centered">
            <ModalHeader toggle={props.toggle}>The answer to the question</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea 
                        rows="6"
                        className="form-control" 
                        name="answer" 
                        placeholder="Write answer here..." 
                        ref={register({
                            required: true, 
                            minLength: 30
                        })}
                    />
                    {
                        errors.answer &&
                        <>
                            {errors?.answer?.types?.required && <FormFeedback>The answer to the question is required</FormFeedback>}
                            {errors?.answer?.types?.minLength && <FormFeedback>Min length of the answer is 30 characters!</FormFeedback>}
                        </>
                    }
                    <input type="hidden" name="date" ref={register} defaultValue={currency} />
                    <input type="hidden" name="user" ref={register} defaultValue={currentUser ? currentUser.uid : ''} />
                    <hr />
                    <Button type="submit" color="primary">
                        &#160;&#160;<FaTelegramPlane />&#160;Send&#160;&#160;
                    </Button>
                    <div className="btn btn-outline-dark ml-2 cp" onClick={() => {props.setModal(false)}}>
                        &#160;&#160;Cancel&#160;&#160;
                    </div>
                </form>
            </ModalBody>
        </Modal>
        {info ? <ToastAlert header="Congratulations!" text={info.message} color="success" /> : ''}
        </>
    )
}