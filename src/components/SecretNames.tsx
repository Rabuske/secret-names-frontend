import React, { ReactNode } from 'react';
import {Chat} from './chat/Chat'
import {Board} from './board/Board'
import { useSelector } from 'react-redux';
import { ConnectionPage } from './connection/ConnectionPage';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import { Responsive, WidthProvider, Layouts } from 'react-grid-layout';
import { useStyles } from './SecretNames.jss';
import { Team } from './team/Team';
import { GameControlWrapper as GameControl } from './board/game-control/GameControlWrapper';
import { TEAM_A, TEAM_B } from '../models/game/agent';
import { connectionStatusSelector } from '../redux/connection/selectors';
import { ConnectionStatus } from '../models/connection/ConnectionStatus';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const gridSizing = 10;
const gridSpacing = 16;
const gridColumns = {
  lg: gridSizing,
  md: gridSizing,
  sm: gridSizing,
  xs: gridSizing,
  xxs: gridSizing,
};
const gridLayout = {
    boardPanel: {x: 0, y: 0, w: 6, h: 8, i: 'board'},
    teamAPanel: {x: 6, y: 0, w: 2, h: 6, i: 'teamA'},
    teamBPanel: {x: 8, y: 0, w: 2, h: 6, i: 'teamB'},
    controlPanel: {x: 6, y: 7, w: 4, h: 2, i: 'control'},
    chatPanel: {x: 0, y: 8, w: 14, h: 4, i: 'chat'}
}

const gridLayouts: Layouts = {
    // Screen size = 1920 x 1080 (Content size = 1870 x 1000)
    lg: [
        { ...gridLayout.boardPanel, minW: 6, minH: 6 },
        { ...gridLayout.teamAPanel, minW: 2, minH: 6 },
        { ...gridLayout.teamBPanel, minW: 2, minH: 6 },
        { ...gridLayout.controlPanel, minW: 4, minH: 1 },
        { ...gridLayout.chatPanel, minW: 8, minH: 2 },
    ],
    // Screen size = 1440 x 900 (Content size = 1390 x 820)
    md: [
        { ...gridLayout.boardPanel, minW: 6, minH: 6 },
        { ...gridLayout.teamAPanel, minW: 2, minH: 6 },
        { ...gridLayout.teamBPanel, minW: 2, minH: 6 },
        { ...gridLayout.controlPanel, minW: 4, minH: 1 },
        { ...gridLayout.chatPanel, minW: 8, minH: 2 },
      ],
    // Screen size = 1280 x 800 (Content size = 1230 x 720)
    sm: [
        { ...gridLayout.boardPanel, minW: 6, minH: 6 },
        { ...gridLayout.teamAPanel, minW: 2, minH: 6 },
        { ...gridLayout.teamBPanel, minW: 2, minH: 6 },
        { ...gridLayout.controlPanel, minW: 4, minH: 1 },
        { ...gridLayout.chatPanel, minW: 8, minH: 2 },
      ],
    // Screen size = 1024 x 600 (Content size = 970 x 670)
    xs: [
        { ...gridLayout.boardPanel, minW: 5, minH: 6 },
        { ...gridLayout.teamAPanel, minW: 2, minH: 6 },
        { ...gridLayout.teamBPanel, minW: 2, minH: 6 },
        { ...gridLayout.controlPanel, minW: 4, minH: 1 },
        { ...gridLayout.chatPanel, minW: 8, minH: 2 },
      ],
  };

const Game: React.FC<boolean> = props => {
    const isConnected = props;
    const classes = useStyles();

    const createPanel = (panelId: string, panelContent: ReactNode): ReactNode => (
        <div key={panelId} className={classes.panelContent}>
            {panelContent}
        </div>
    );    

    if(isConnected){
        return (
            <ResponsiveReactGridLayout
                rowHeight={50}
                cols={gridColumns}
                layouts={gridLayouts}
                margin={[gridSpacing, gridSpacing]}
                containerPadding={[gridSpacing, gridSpacing]}
                isDraggable={false}
                isResizable={false}
                useCSSTransforms={false}
                compactType="vertical"
                breakpoints={{ lg: 1870, md: 1390, sm: 1230, xs: 970, xxs: 0 }}
                >
              {createPanel(gridLayout.boardPanel.i, <Board/>)}
              {createPanel(gridLayout.teamAPanel.i, <Team teamID={TEAM_A}/>)}
              {createPanel(gridLayout.teamBPanel.i, <Team teamID={TEAM_B}/>)}
              {createPanel(gridLayout.controlPanel.i, <GameControl/>)}
              {createPanel(gridLayout.chatPanel.i, <Chat/>)}

            </ResponsiveReactGridLayout>
        );
    } else {
        return <ConnectionPage/>
    }
}

export const SecretNames : React.FC = () =>{
    const isConnected = useSelector(connectionStatusSelector) === ConnectionStatus.Connected;
    return Game(isConnected);
}