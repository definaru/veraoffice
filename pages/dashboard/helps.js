import React from 'react'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { NewTicket } from '../../components/helper/NewTicket'


export default function Helps()
{

    const Title = 'Your questions'
    const Ticket = <NewTicket title={Title} />

    return (
        <AdminInterface title={Title}>
            {Ticket}
        </AdminInterface>
    )
}