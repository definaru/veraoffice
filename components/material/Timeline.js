export function Timeline()
{
    return (
        <Card className="mb-3">
            <CardBody>
                <h5>Timeline Last Sign In:</h5>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date Login</th>
                            <th>Location</th>
                            <th>Browser</th>
                            <th>Device</th>
                            <th className="text-right">IP Adress</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{width: '30px'}}>1</td>
                            <td>
                                <b>
                                    <AiOutlineCalendar className="text-muted" /> December 15, 2020 <small>| 08:06:40</small>
                                </b>
                            </td>
                            <td>
                                <FaMapMarkerAlt className="text-vera" /> Russia, Moscow
                            </td>
                            <td>
                            <img 
                                src="https://cdn.icon-icons.com/icons2/836/PNG/128/Google_Chrome_icon-icons.com_66794.png" 
                                className="mr-1"
                                style={{display: 'inline', width: '19px' }}
                            /> Chrome 87
                            </td>
                            <td><AiOutlineDesktop style={{opacity: '0.4'}} /> PC, Windows</td>
                            <td className="text-right">
                                <AiOutlineGlobal className="text-muted" style={{opacity: '0.5'}} />&#160; 
                                <a href="http://ru.smart-ip.net/geoip/195.91.178.166/auto" target="_blank">
                                    <u>195.91.178.166</u>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}