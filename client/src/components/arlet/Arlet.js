import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/index'
import Loading from './Loading';
import Toast from './Toast';

function Arlet() {
    const { auth, arlet } = useSelector(state => state)
    const dispatch = useDispatch()
   
    return (
        <div>
            {arlet.loading && <Loading />}

            {arlet.error && <Toast msg={{title:'Error',body:arlet.error}}
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} 
                bgColor="bg-danger" />}

            {arlet.success && <Toast msg={{title:'Success',body:arlet.success}}
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} 
                bgColor="bg-success" />}
        </div>
    );
}

export default Arlet;