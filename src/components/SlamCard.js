// src/components/SlamCard.js
import React, { useContext } from 'react';
import { SbContext } from '../context/Context';
import { SET_SINGLE_SB } from '../context/action.types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const SlamCard = ({ index, title, slam }) => {

    const { state, dispatch } = useContext(SbContext)
    const history = useHistory()

    const { data } = slam



    const colors = ['#fe9d9b', '#fee290', '#9fa1ff', '#a0fcd2']
    const textColor = ['#D63031', '#fd912c', '#3C40C6', '#218F76']
    const classArray = ['text-danger', 'text-warning', 'text-primary', 'text-success']
    const styles = {
        backgroundColor: colors[index],
        border: 'none',
        borderRadius: '15px',
        height: '17rem'
    }



    const viewSlambook = (slam) => {
        dispatch({
            type: SET_SINGLE_SB,
            payload: slam
        })
        history.push('/slam/view')
    }

    return (
        <div className="mb-4 mx-3 d-flex flex-column justify-content-center"
            onClick={() => viewSlambook(slam)}
            style={{
                width: '15.5rem',
                height: '23rem',
                cursor: 'pointer'
            }} >
            <div className={`card mb-3 p-3 shadow-box ${classArray[index]}`} style={styles} >
                {title && <p className='text-right' style={{ color: textColor[index] }}>#{title.toLowerCase()}</p>}
                <div className="card-body d-flex flex-column justify-content-center">
                    <h3 className="card-title   mb-2" style={{ color: textColor[index] }}>{data.caption}</h3>
                </div>
            </div>
            <div className="d-flex align-items-center p-1">
                <img src={data.owner_data.avatar} alt="" className="img-thumbnail" style={{ width: '4rem', height: '4rem', borderRadius: '2rem' }} />
                <div className='p-2'>
                    <p>{data.owner_data.name}</p>
                </div>
            </div>
        </div>
    );
}

export default SlamCard;