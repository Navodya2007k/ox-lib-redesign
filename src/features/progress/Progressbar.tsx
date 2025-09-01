import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
    background: 'transparent',
  },

  labelWrapper: {
    width: 380,
    height: 30,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },

  labelBox: {
    backgroundImage: 'radial-gradient(circle, #9112BC, #9112BC)',
    padding: '4px 16px',
    height: 52,
    display: 'flex',
    marginTop: '15px',
    alignItems: 'center',
    marginLeft: -30,
    justifyContent: 'center',
    textTransform: 'uppercase',
    clipPath: 'polygon(0 0, 100% 6%, 100% 86%, 0% 100%)',
    zIndex: 3,
    transform: 'rotate(-5deg)', 
    transformOrigin: 'center',
  },

  label: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 700,
    fontFamily: 'Bebas Neue, sans-serif',
    lineHeight: 1,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },

  progressContainer: {
    backgroundImage: 'radial-gradient(circle, #0000007c, #9112bc7e)',
    height: 55,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 1,
  },

  gradientOverlay: {
    content: '""',
    position: 'fixed',
    top: 925,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(0deg, #ae75da6b 27%, #ae75da05 100%)',
    zIndex: 0,
    display: 'none', 
  },

  gradientOverlayVisible: {
    display: 'block',
  },

  container: {
    width: 380,
    height: 8,
    background: '#ae75da1a',
    overflow: 'hidden',
    borderRadius: 4,
    border: '1px solid #fdfbff2a',
    position: 'relative',
    zIndex: 1,
  },

  bar: {
    height: '100%',
    background: 'linear-gradient(90deg, #9112BC #9112BC 93 100%)',
    borderRadius: 4,
    transition: 'width 0.1s linear',
    position: 'relative',
    boxShadow: 'inset 0 0 10px #9112BC',
    zIndex: 1,
  },

  handle: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    background: '#fff',
    borderRadius: '50%',
    zIndex: 2,
  },

}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const progressIntervalRef = React.useRef<NodeJS.Timeout>();

  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = undefined;
    }
  };

  useNuiEvent('progressCancel', () => {
    clearProgressInterval();
    setVisible(false);
    fetchNui('progressComplete');
  });

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    if (visible) {
      clearProgressInterval();
    }

    setVisible(true);
    setValue(0);
    setLabel(data.label || '');
    setDuration(data.duration);

    const onePercent = data.duration * 0.01;
    clearProgressInterval();

    progressIntervalRef.current = setInterval(() => {
      setValue((prevValue) => {
        const newValue = prevValue + 1;
        if (newValue >= 100) {
          clearProgressInterval();
          setVisible(false);
          fetchNui('progressComplete');
        }
        return newValue;
      });
    }, onePercent);
  });

  React.useEffect(() => {
    return () => clearProgressInterval();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Box className={`${classes.gradientOverlay} ${visible ? classes.gradientOverlayVisible : ''}`} />
      <ScaleFade visible={visible} onExitComplete={() => {}}>
        <Box className={classes.labelWrapper}>
          <Box className={classes.labelBox}>
            <Text className={classes.label}>{label}</Text>
          </Box>
        </Box>
        <Box className={classes.progressContainer}>
          <Box className={classes.container}>            
            <Box className={classes.bar} style={{ width: `${value}%` }}>
              <Box
                className={classes.handle}
                style={{
                  left: '100%',
                  transform: 'translateX(-50%)',
                }}
              />
            </Box>
            
          </Box>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default Progressbar;