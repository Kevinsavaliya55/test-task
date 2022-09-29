import React from 'react';
import {
    HeaderComponent,
    FooterComponent,
    SidePanelComponent,
} from '../../Components';

const LayoutContainer = (props) => {
    const { children } = props;
    return (
        <>
            <HeaderComponent />
            <div style={{display:"flex"}}>
            <div className='sidebar'><SidePanelComponent /></div>
            <div>{children}</div>
            
            </div>
            <FooterComponent />
        </>
    );
};

export default LayoutContainer;
