import React, { useState } from 'react';

interface TeamProps{
    teamName: string;
}

export const Team : React.FC<TeamProps> = (props) => {
    const [teamName] = useState(props.teamName);

    return(
        <div>
            <h2>{teamName}</h2>
        </div>
    );
}