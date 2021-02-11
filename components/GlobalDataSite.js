import { useState, useEffect } from 'react'

export function GlobalDataSite()
{

    const [items, setItems] = useState(null)

    useEffect(() => {
        try {
            const fetchData = async () => {
                await fetch(`https://5guys.ru/v1/company/data`)
                    .then(response => response.json())
                    .then(json => setItems(json.info))
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