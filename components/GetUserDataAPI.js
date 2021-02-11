import { useState, useEffect } from 'react'

export function GetUserDataAPI()
{
    const [items, setItems] = useState(null)

    useEffect(() => {
        try {
            const fetchData = async () => {
                await fetch(`https://crm-defina.com/api/page/user/455225586.json`)
                    .then(response => response.json())
                    .then(json => setItems(json))
                    .catch(
                        error => setItems(
                            {
                                status: 'Error',
                                code: '400',
                                message: 'Probable cause: ' + error.message,
                                info: 'Request URL: ' + items
                            }
                        )
                    )
            }
            fetchData()

        } catch (error) {
            console.log('Error! ' + error.message);
        }
    }, [])

    return items
}