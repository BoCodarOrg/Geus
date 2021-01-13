import React from 'react';

import { IconReviewer } from './style'

interface IProps {
    name: string
    onClick?: any
}

const IconUsers: React.FC<IProps> = (props) => {
    return (
        <IconReviewer
            onClick={props.onClick}>
            {props.name[0].charAt(0).toUpperCase()}
            {props.name[1]?.charAt(0).toUpperCase() || ''}
        </IconReviewer>)
}

export default IconUsers;