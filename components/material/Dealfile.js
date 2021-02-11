import { Media } from 'reactstrap'
import { Scrollbars } from 'react-custom-scrollbars'

export default function Dealfile()
{
    return (
        <Scrollbars 
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ width: '100%', height: 380 }}
        >
        <div>
            <Media tag="h3" className="js-loon mt-4 ml-4 text-vera">AS IS CONTRACT CASH OFFER NO FINANCING</Media>
            <ul>
                <li>AS IS Residential Contract for Sale and Purchase</li>
                <li>CR-5_A. Condominium Rider</li>
                <li>CR-5_B. Homeowners Association - Community Disclosure</li>
                <li>CR-5_P. Lead Based Paint Disclosure</li>
                <li>CRSP15.R.mold inspection addendum</li>
                <li>Extension Addendum to Contract</li>
            </ul>

            <Media tag="h3" className="js-loon mt-4 ml-4 text-vera">AS IS CONTRACT CONVENTIONAL FINANCING</Media>
            <ul>
                <li>AS IS Residential Contract for Sale and Purchase</li>
                <li>CR-5_A. Condominium Rider</li>
                <li>CR-5_B. Homeowners Association - Community Disclosure</li>
                <li>CR-5_P. Lead Based Paint Disclosure​</li>
                <li>Extension Addendum to Contract</li>
            </ul>

            <Media tag="h3" className="js-loon mt-4 ml-4 text-vera">AS IS CONTRACT FHA FINANCING</Media>
            <ul>
                <li>AS IS Residential Contract for Sale and Purchase</li>
                <li>CR-5_A. Condominium Rider</li>
                <li>CR-5_B. Homeowners Association - Community Disclosure</li>
                <li>CR-5_E. FHA - VA</li>
                <li>CR-5_P. Lead Based Paint Disclosure</li>
                <li>Extension Addendum to Contract</li>
            </ul>

            <Media tag="h3" className="js-loon mt-4 ml-4 text-vera">CRSP CONTRACT</Media>
            <ul>
                <li>CRSP15 Contract for Residential Sale and Purchase</li>
                <li>CRSP15.F.condo addendum</li>
            </ul>

            <Media tag="h3" className="js-loon mt-4 ml-4 text-vera">LISTING PACKAGE (SALE) TRANSACTION BROKER</Media>
            <ul>
                <li>Exclusive Right of Sale Listing Agreement, Transaction Broker</li>
                <li>Seller Property Disclosure - Condominium</li>
                <li>Seller Property Disclosure - Residential</li>
            </ul>

            <Media tag="h3" className="js-loon mt-4 ml-4 text-vera">COMMERCIAL TRANSACTION DOCUMENT CHECHLIST</Media>
            <ul>
                <li>LOI (letter of intent)</li>
                <li>Sales Contract (commercial)</li>
                <li>Attorney contact information</li>
                <li>Confidential / holdharmless</li>
            </ul>

        </div>
        </Scrollbars>
    )
}