import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product}) {


    
    return (
        <div className="row_btn">
                    <Link id="btn_buy" to="#!">
                        Buy
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        View
                    </Link>
        </div>
    )
}

export default BtnRender