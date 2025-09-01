import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';


const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    backgroundColor: '#9112bc49',
    height: 60,
    width: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 500,
  },


  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
    
  },
  titleContainer: {
   display: 'inline-block',
   marginTop: '5px',
   color: 'white',
   marginRight:'170px',
   position: 'absolute',
    backgroundColor: '#9112BC',
    width:'200px',
    height:'50px',
    clipPath: 'polygon(0 0, 100% 4%, 100% 96%, 0% 100%)',
    zIndex: 1,
  },
  titleText: {
    color: theme.colors.dark[0],
   display:'block',
   marginTop: '2px',
   fontFamily: 'Bebas Neue',
    padding: 6,
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsContainer: {
    height: 560,
    
    overflowY: 'scroll',
  },
  buttonsFlexWrapper: {
    gap: 0.1,
    backgroundColor: '#14021aff',
    
  },


}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
   
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
            <Text className={classes.titleText}>
              <ReactMarkdown>{title}</ReactMarkdown>
            </Text>
          </Box>
     
    </Box>
    
  );
};

export default React.memo(Header);
