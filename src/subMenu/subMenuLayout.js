import React, { useState } from "react";
import { MenuItemLink } from 'react-admin'
import { connect } from 'react-redux';
import { getResources } from 'admin-on-rest';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DirectionsCar from "@material-ui/icons/DirectionsCar";

const SubMenuLayout = ({resources, onMenuClick}) =>{
    const [open, setOpen] = useState(false);
    const subMenu = ['offline', 'online', 'others']

    const handleClick = () => {
        setOpen(!open);
    };  

    return (
        <div>
            <MenuItemLink
                key='vehicles'
                to='/vehicles'
                primaryText={<>
                    <span style={{flex: 1}}>vehicles</span>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </>}
                leftIcon={<DirectionsCar />}
                onClick={handleClick}
            />
            <Collapse in={open} timeout="auto" style={{paddingLeft : 15}}>
                {resources.map(item => {
                    if(subMenu.includes(item.name)) {
                        return(<MenuItemLink
                            key={item.name}
                            to={`/${item.name}`}
                            primaryText={item.name}
                            leftIcon={<item.icon />}
                            onClick={onMenuClick} />
                        )
                    }
                })}
            </Collapse>
            {resources.map(item => {
                if(!subMenu.includes(item.name) && item.name !== 'vehicles') {
                    return(<MenuItemLink
                    key={item.name}
                    to={`/${item.name}`}
                    primaryText={item.name}
                    leftIcon={<item.icon />}
                    onClick={onMenuClick}
                    />)
                }
            })}
        </div>
    )
}

const mapStateToProps = state => ({
    resources: getResources(state),
})

export default connect(mapStateToProps)(SubMenuLayout);