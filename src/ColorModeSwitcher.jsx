// import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ColorModeSwitcher = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            {...props}
        />
    );
};

export default ColorModeSwitcher;
