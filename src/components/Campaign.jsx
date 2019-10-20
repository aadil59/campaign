import React from 'react'

export default function  Campaign(props) {
    const {campaignItem, statusCurrent} = props;
    let activeClass = statusCurrent(campaignItem.startDate, campaignItem.endDate);
    return (
        <React.Fragment>
            <tr>
                <td>
                    {campaignItem.name}
                </td>
                <td>
                    {campaignItem.startDate}
                </td>
                <td>
                    {campaignItem.endDate}
                </td>
                <td><span className={activeClass ?  "circle active" : "circle inactive"} ></span>{activeClass ? 'Active': 'Inactive'}</td>
                <td>
                    {campaignItem.Budget}
                </td>
            </tr>
        </React.Fragment>
    )
}