import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Avatar, Box, createStyles, Group, keyframes, Stack, Text } from '@mantine/core';
import React from 'react';
import type { NotificationProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    color: 'white',
    padding: 12,
    fontFamily: 'Roboto',
  },
  title: {
    fontWeight: 500,
    lineHeight: 'normal',
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
  descriptionOnly: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },

  cornerTL: {
  position: 'absolute',
  top: -2,
  left: -2,
  width: 10,
  height: 10,
  border: '2px solid #9112BC',
  borderRight: 'none',
  borderBottom: 'none',
},

cornerTR: {
  position: 'absolute',
  top: -2,
  right: -2,
  width: 10,
  height: 10,
  border: '2px solid #9112BC',
  borderLeft: 'none',
  borderBottom: 'none',
},

cornerBL: {
  position: 'absolute',
  bottom: -2,
  left: -2,
  width: 10,
  height: 10,
  border: '2px solid #9112BC',
  borderRight: 'none',
  borderTop: 'none',
},

cornerBR: {
  position: 'absolute',
  bottom: -2,
  right: -2,
  width: 10,
  height: 10,
  border: '2px solid #9112BC',
  borderLeft: 'none',
  borderTop: 'none',
},
}));

// I hate this
const enterAnimationTop = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const enterAnimationBottom = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const exitAnimationTop = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
});

const exitAnimationRight = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
});

const exitAnimationLeft = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
});

const exitAnimationBottom = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;
    // Backwards compat with old notifications
    let position = data.position;
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }
    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = 'circle-xmark';
          break;
        case 'success':
          data.icon = 'circle-check';
          break;
        case 'warning':
          data.icon = 'circle-exclamation';
          break;
        default:
          data.icon = 'circle-info';
          break;
      }
    }
    toast.custom(
      (t) => (
        <Box
  sx={{
    backgroundColor:
      data.type === 'error'
        ? '#ff0004a9' // red
        : data.type === 'success'
        ? '#0b214bad' // green
        : data.type === 'warning'
        ? '#8fa31ea6' // orange
        : '#0b2e4bab', // info/blue
    animation: t.visible
      ? `${position?.includes('bottom') ? enterAnimationBottom : enterAnimationTop} 0.2s ease-out forwards`
      : `${
          position?.includes('right')
            ? exitAnimationRight
            : position?.includes('left')
            ? exitAnimationLeft
            : position === 'top-center'
            ? exitAnimationTop
            : position
            ? exitAnimationBottom
            : exitAnimationRight
        } 0.4s ease-in forwards`,
    ...data.style,
    color: 'white', // ensures text is readable
  }}
  className={classes.container} >
    <span className={classes.cornerTL}></span>
      <span className={classes.cornerTR}></span>
      <span className={classes.cornerBL}></span>
      <span className={classes.cornerBR}></span>
  
          <Group noWrap spacing={12}>
            <Stack spacing={0}>
              {data.title && <Text className={classes.title}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
                >
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>
        </Box>
      ),
      {
        id: data.id?.toString(),
        duration: data.duration || 3000,
        position: position || 'top-right',
      }
    );
  });

  return <Toaster />;
};

export default Notifications;