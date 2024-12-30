import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {

    const [ smartcb_banner_title, setBannerTitle ] = useState( '' );
    const [ smartcb_banner_desc, setBannerDesc ]   = useState( '' );
    const [ smartcb_banner_accept_btn, SetAcceptBtn ]  = useState( '' );
    const [ smartcb_banner_decline_btn, SetDeclineBtn ] = useState( '' );
    const [ loader, setLoader ] = useState( 'Save Settings' );

    const url = `${appCookie.apiUrl}smartcb/v1/settings`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader( 'Saving...' );
        axios.post( url, {
            smartcb_banner_title: smartcb_banner_title,
            smartcb_banner_desc: smartcb_banner_desc,
            smartcb_banner_accept_btn: smartcb_banner_accept_btn,
            smartcb_banner_decline_btn: smartcb_banner_decline_btn
        }, {
            headers: {
                'content-type': 'application/json',
                'X-WP-Nonce': appCookie.nonce
            }
        } )
        .then( ( res ) => {
            setLoader( 'Save Settings' );
        } )
    }

    useEffect(() => {
        // Load initial settings with GET request
        axios.get(url)
        .then((res) => {
            setBannerTitle(res.data.smartcb_banner_title);
            setBannerDesc(res.data.smartcb_banner_desc);
            SetAcceptBtn(res.data.smartcb_banner_accept_btn);
            SetDeclineBtn(res.data.smartcb_banner_decline_btn);
        })
        .catch((err) => {
            // Handle error
        });
    }, []);

    return(
        <React.Fragment>
            <h2>Cookies Banner Settings Form</h2>
            <form id="work-settings-form" onSubmit={ (e) => handleSubmit(e) }>
                <table className="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label htmlFor="smartcb_banner_title">Banner Title</label>
                            </th>
                            <td>
                                <input id="smartcb_banner_title" name="smartcb_banner_title" value={ smartcb_banner_title } onChange={ (e) => { setBannerTitle( e.target.value ) } } className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="smartcb_banner_desc">Banner Description</label>
                            </th>
                            <td>
                                <textarea 
                                id="smartcb_banner_desc" 
                                name="smartcb_banner_desc" 
                                value={ smartcb_banner_desc } 
                                onChange={ (e) => { setBannerDesc( e.target.value ) } } 
                                className="regular-text"
                                rows="4"
                                cols="50"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="smartcb_banner_accept_btn">Accept Button Text</label>
                            </th>
                            <td>
                                <input id="smartcb_banner_accept_btn" name="smartcb_banner_accept_btn" value={ smartcb_banner_accept_btn } onChange={ (e) => { SetAcceptBtn( e.target.value ) } } className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="smartcb_banner_accept_btn">Decline Button Text</label>
                            </th>
                            <td>
                                <input id="smartcb_banner_decline_btn" name="smartcb_banner_decline_btn" value={ smartcb_banner_decline_btn } onChange={ (e) => { SetDeclineBtn( e.target.value ) } } className="regular-text" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">{ loader }</button>
                </p>
            </form>
        </React.Fragment>
    )
}

export default Settings;