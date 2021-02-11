import React from 'react'

export function convertTimestamp(timestamp)
{

    let month = new Array()
    month[0] = "January"
    month[1] = "February"
    month[2] = "March"
    month[3] = "April"
    month[4] = "May"
    month[5] = "June"
    month[6] = "July"
    month[7] = "August"
    month[8] = "September"
    month[9] = "October"
    month[10] = "November"
    month[11] = "December"

    let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = month[d.getMonth()],  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM

    time = '<b>' + mm + ' ' + dd + ', ' + yyyy + '</b> <small>&#160;&#160;|&#160;&#160;' + h + ':' + min + ' ' + ampm +'</small>';

    return (
        <span dangerouslySetInnerHTML={ {__html: time} } />
    )
}